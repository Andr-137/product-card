document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.item-tab');

    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


