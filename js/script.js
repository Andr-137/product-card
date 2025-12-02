document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.item-tab');

    // Убедимся, что у первого элемента есть класс 'active' при загрузке
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }

    // Навешиваем обработчик клика на каждый таб
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Убираем класс 'active' у всех
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем 'active' текущему
            this.classList.add('active');
        });
    });
});


