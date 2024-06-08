/* Открытие меню в шапке сайте */
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


/* Подключение календарика */
flatpickr('#lot-date', {
    enableTime: false,
    dateFormat: "Y-m-d",
    locale: "ru"
});


/* Превью лота*/
(function() {
    const FILE_TYPES = ['jpg', 'jpeg', 'png'];

    const formItemFileWrapper = document.querySelector('.form__item--file');
    const formItemFile = formItemFileWrapper.querySelector('.form__input-file');
    const preview = formItemFileWrapper.querySelector('.preview img');
    const buttonClose = formItemFileWrapper.querySelector('.preview__remove');
    let fileChooser = formItemFileWrapper.querySelector('.form__input-file input[type=file]');

    const onFileChooserClick = function() {
        const file = fileChooser.files[0];
        const fileName = file.name.toLowerCase();

        const matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                formItemFileWrapper.classList.add('form__item--uploaded');
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    }

    onbuttonCloseClick = function(evt) {
        evt.preventDefault();

        formItemFileWrapper.classList.remove('form__item--uploaded');
        fileChooser.remove();

        formItemFile.prepend(fileChooser);
        fileChooser.addEventListener('change', onFileChooserClick);
    }
    
    fileChooser.addEventListener('change', onFileChooserClick);
    buttonClose.addEventListener('click', onbuttonCloseClick);
})();
