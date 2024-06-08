/** Menu toggler */
(() => {
  const buttonElement = document.querySelector(".button__menu-open");
  const actionElement = document.querySelector(".user-menu--login");

  const onButtonClick = () => {
    buttonElement.classList.toggle("menu-open--active");
    actionElement.classList.toggle("user-menu--active");
  };

  if (actionElement) buttonElement.addEventListener("click", onButtonClick);
})();

/** Date picker */
// (() => {
//   const datePickerElement = document.querySelector("#id_finished_at");

//   if (datePickerElement) {
//     flatpickr(datePickerElement, {
//       enableTime: true,
//       dateFormat: "y/m/d H:i",
//       locale: "en",
//     });
//   }
// })();

/** Lot preview */
(() => {
  const FILE_TYPES = ["jpg", "jpeg", "png"];

  const uploaderElement = document.querySelector(".uploader");

  if (uploaderElement) {
    const previewElement = uploaderElement.querySelector(".uploader__image");
    const chooseFileElement = uploaderElement.querySelector(".uploader__input");

    const onFileChange = () => {
      const file = chooseFileElement.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          uploaderElement.classList.add("uploader__input--selected");
          previewElement.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    };

    chooseFileElement.addEventListener("change", onFileChange);
  }
})();

/** Hide message */
(() => {
  const messageElements = document.querySelectorAll(".messages__item");
  if (!messageElements.length) return;

  for (const messageElement of messageElements) {
    const closeButtonElement = messageElement.querySelector(".message__close");
    closeButtonElement.addEventListener("click", () => messageElement.remove());
  }
})();
