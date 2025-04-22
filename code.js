function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
  // Закройте раскрывающийся список, если пользователь щелкнет за его пределами
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
}

// Отзывы с сохранением в localStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviews");

  // Загрузка сохранённых отзывов при загрузке страницы
  function loadReviews() {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      const reviews = JSON.parse(saved);
      reviews.forEach(review => addReviewToPage(review.name, review.text));
    }
  }

  // Добавление отзыва в HTML
  function addReviewToPage(name, text) {
    const reviewElement = document.createElement("div");
    reviewElement.style.border = "1px solid #ccc";
    reviewElement.style.padding = "15px";
    reviewElement.style.marginTop = "10px";
    reviewElement.style.backgroundColor = "#f9f9f9";
    reviewElement.style.borderRadius = "10px";
    reviewElement.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
    reviewsContainer.appendChild(reviewElement);
  }

  // Сохраняем в localStorage
  function saveReview(name, text) {
    const saved = localStorage.getItem("reviews");
    const reviews = saved ? JSON.parse(saved) : [];
    reviews.push({ name, text });
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // При отправке формы
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const reviewText = document.getElementById("review").value.trim();

      if (name && reviewText) {
        addReviewToPage(name, reviewText);
        saveReview(name, reviewText);
        form.reset();
      }
    });
  }

  // Очистка отзывов
  const clearBtn = document.getElementById("clearReviews");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("reviews");
      reviewsContainer.innerHTML = "";
    });
  }
  
  // Загружаем сохранённые отзывы при старте
  if (reviewsContainer) {
    loadReviews();
  }
});
