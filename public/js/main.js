(() => {
  /* Menu toggler */
  const buttonElement = document.querySelector('.button__menu-open');
  const actionElement = document.querySelector('.user-menu--login');

  const onButtonClick = () => {
    buttonElement.classList.toggle('menu-open--active');
    actionElement.classList.toggle('user-menu--active');
  }

  if (actionElement) buttonElement.addEventListener('click', onButtonClick);
})();

(() => {
  /* Date picker */
  const datePickerElement = document.querySelector('#date-picker');

  if (datePickerElement) {
    flatpickr(datePickerElement, {
      enableTime: false,
      dateFormat: "Y-m-d",
      locale: "ru"
    });
  }
})();

(() => {
  /* Lot preview */
  const FILE_TYPES = ['jpg', 'jpeg', 'png'];

  const wrapperElement = document.querySelector('.form__item--file');
  const previewElement = wrapperElement.querySelector('.preview img');
  const chooseFileElement = wrapperElement.querySelector('.form__input-file input[type=file]');
  const closeButtonElement = wrapperElement.querySelector('.preview__remove');

  const onFileChange = () => {
    const file = chooseFileElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        wrapperElement.classList.add('form__item--uploaded');
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  const onCloseButtonClick = () => {
    wrapperElement.classList.remove('form__item--uploaded');
    chooseFileElement.value = '';
    previewElement.src = '';
  }

  chooseFileElement.addEventListener('change', onFileChange);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
})();
