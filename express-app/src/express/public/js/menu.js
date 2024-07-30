const buttonElement = document.querySelector('.menu-toggler');
const actionElement = document.querySelector('.user-menu--logged-in');

const onButtonClick = () => {
  buttonElement.classList.toggle('menu-toggler--active');
  actionElement.classList.toggle('user-menu--active');
};

if (actionElement) {
  buttonElement.addEventListener('click', onButtonClick)
};