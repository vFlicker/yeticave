/* Открытие меня в шапке сайте */
(function() {
    const $button = document.querySelector('.button__menu-open');
    const $action = document.querySelector('.user-menu--login');

    const onMenuClick = function(evt) {
        evt.preventDefault();
        $button.classList.toggle('menu-open--active');
        $action.classList.toggle('user-menu--active');
    }

    if ($action) {
        $button.addEventListener('click', onMenuClick);
    }

})();

