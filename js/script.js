document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.item-tab');
    const productCards = document.querySelectorAll('.product-card__card');
    
    // Функция для получения текста вкладки без количества
    function getTabText(tabElement) {
        // Клонируем элемент, чтобы не изменять оригинал
        const clone = tabElement.cloneNode(true);
        // Удаляем элемент с количеством если есть
        const quantityElement = clone.querySelector('.quantity');
        if (quantityElement) {
            quantityElement.remove();
        }
        // Получаем чистый текст вкладки
        return clone.textContent.trim().toLowerCase();
    }
    
    // Функция для получения категории из текста вкладки
    function getCategoryFromTabText(tabText) {
        const categoryMap = {
            'all': 'all',
            'marketing': 'marketing',
            'management': 'management',
            'hr & recruting': 'recruting',
            'design': 'design',
            'development': 'development'
        };
        
        // Ищем совпадение в тексте вкладки
        for (const [key, value] of Object.entries(categoryMap)) {
            if (tabText.includes(key)) {
                return value;
            }
        }
        
        return 'all'; // По умолчанию
    }

    // Инициализация - делаем первую вкладку активной
    if (tabs.length > 0) {
        // Получаем количество для каждой вкладки
        tabs.forEach(tab => {
            const quantityElement = tab.querySelector('.quantity');
            if (quantityElement) {
                const tabText = getTabText(tab);
                const category = getCategoryFromTabText(tabText);
                const count = countProductsByCategory(category);
                quantityElement.textContent = count;
            }
        });
        
        // Активируем первую вкладку
        tabs[0].classList.add('active');
        filterProducts('all');
    }

    // Обработчик клика на вкладки
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabText = getTabText(this);
            const category = getCategoryFromTabText(tabText);
            
            // Убираем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Фильтруем продукты
            filterProducts(category);
        });
    });

    // Функция фильтрации продуктов по категории
    function filterProducts(category) {
        productCards.forEach(card => {
            // Получаем класс категории карточки
            const jobElement = card.querySelector('.job');
            let cardCategory = '';
            
            if (jobElement) {
                // Ищем класс содержащий 'job-color__'
                const classes = Array.from(jobElement.classList);
                const categoryClass = classes.find(cls => cls.startsWith('job-color__'));
                
                if (categoryClass) {
                    // Извлекаем название категории из класса
                    cardCategory = categoryClass.replace('job-color__', '');
                }
            }
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Анимация появления
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                // Анимация исчезновения
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Функция подсчета продуктов по категории
    function countProductsByCategory(category) {
        if (category === 'all') return productCards.length;
        
        let count = 0;
        productCards.forEach(card => {
            const jobElement = card.querySelector('.job');
            if (jobElement) {
                const classes = Array.from(jobElement.classList);
                const categoryClass = classes.find(cls => cls.startsWith('job-color__'));
                
                if (categoryClass && categoryClass.includes(category)) {
                    count++;
                }
            }
        });
        
        return count;
    }

    // Функция для поиска (если есть поле поиска)
    const searchBlock = document.querySelector('.search-block');
    if (searchBlock) {
        const searchInput = searchBlock.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                productCards.forEach(card => {
                    // Получаем все текстовое содержимое карточки для поиска
                    const cardText = card.textContent.toLowerCase();
                    
                    if (searchTerm === '' || cardText.includes(searchTerm)) {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        }
    }

    // Добавляем плавные анимации для карточек
    productCards.forEach((card, index) => {
        card.style.transition = 'all 0.3s ease-in-out';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Задержка для эффекта появления по очереди
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50 * index);
    });

    // Обработка кнопки "Load more" если она есть
    const loadMoreBtn = document.querySelector('.update__block');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Имитация загрузки дополнительных карточек
            const loadingMessage = document.createElement('div');
            loadingMessage.textContent = 'Загрузка дополнительных карточек...';
            loadingMessage.style.textAlign = 'center';
            loadingMessage.style.padding = '20px';
            
            loadMoreBtn.parentNode.insertBefore(loadingMessage, loadMoreBtn.nextSibling);
            
            setTimeout(() => {
                loadingMessage.remove();
                alert('Здесь будет загрузка дополнительных карточек. В реальном проекте здесь будет AJAX-запрос.');
            }, 1500);
        });
    }
});