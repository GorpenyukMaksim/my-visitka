document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем звёздочки
    const allStars = document.querySelectorAll('.stars');
    
    allStars.forEach(starsContainer => {
        const stars = starsContainer.querySelectorAll('.star');
        const storageKey = `rating_${starsContainer.id}`;
        
        // Получение рейтинга из localStorage
        let currentRating = localStorage.getItem(storageKey) || 
                          starsContainer.getAttribute('data-rating') || 
                          0;
        currentRating = parseInt(currentRating);
        
        // Установка начального рейтинга
        setRating(stars, currentRating);
        
        // Добавляем обработчики событий
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                currentRating = value;
                setRating(stars, currentRating);
                // Сохранение в localStorage
                localStorage.setItem(storageKey, currentRating);
                // Обновляем data-атрибут
                starsContainer.setAttribute('data-rating', currentRating);
            });
            
            star.addEventListener('mouseover', function() {
                const value = parseInt(this.getAttribute('data-value'));
                highlightStars(stars, value);
            });
            
            star.addEventListener('mouseout', function() {
                highlightStars(stars, currentRating);
            });
        });
    });
    
    // Функция для установки рейтинга
    function setRating(stars, rating) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            star.classList.toggle('active', value <= rating);
        });
    }
    
    // Функция для подсветки звезд при наведении
    function highlightStars(stars, upTo) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            star.style.color = value <= upTo ? '#ffc107' : '#ccc';
        });
    }
});