const SERVER_URL = 'http://localhost:3000';
const COUNT_LOTS = 3;

const socket = io(SERVER_URL);

const createLotElement = ({
  id,
  category,
  title,
  imageUrl,
  currentPrice,
  finishedAt,
}) => {
  return `
  <li class="lot lots__item">
    <div class="lot__image">
      <img src="/img/${imageUrl}" width="350" height="260" alt="${title}" />
    </div>
    <div class="lot__info">
      <div class="lot__header">
        <span class="lot__category">
          ${category.name}
        </span>
        <form action="/watchlist/${id}/" method="POST">
          <button type="submit" class="bookmark-button">
            <svg class="bookmark-button__icon" width="18" height="19">
              <use xlink:href="#icon-bookmark"></use>
            </svg>
            <span class="visually-hidden">To bookmarks</span>
          </button>
        </form>
      </div>
      <h3 class="lot__title">
        <a class="text-link" href="/lots/${id}/">
          ${title}
        </a>
      </h3>

      <div class="lot__state">
        <div class="lot__rate">
          <span class="lot__amount">Price</span>
          <span class="lot__cost">$${currentPrice}</span>
        </div>
        <div class="lot__timer timer">
          ${finishedAt}
        </div>
      </div>
    </div>
  </li>
`;
};

const updateLotsElements = (lot) => {
  const lotList = document.querySelector('.lots__index');
  if (!lotList) return;

  const lotItems = lotList.querySelectorAll('.lot');

  if (lotItems.length >= COUNT_LOTS) {
    lotItems[lotItems.length - 1].remove();
  }

  lotList.insertAdjacentHTML('afterbegin', createLotElement(lot));
};

socket.addEventListener('lot:created', (lot) => {
  updateLotsElements(lot);
});
