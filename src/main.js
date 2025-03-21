import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showLoader,
  hideLoader,
  showError,
} from './js/render-functions.js';

document.querySelector('.form').addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    showError('Please enter a search term!');
    return;
  }

  showLoader();
  const images = await fetchImages(query);
  hideLoader();

  if (images.length === 0) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  } else {
    renderImages(images);
  }
});

// ********************* пагінація **********************

let currentPage = 1;
let currentQuery = '';

async function handleSearch(query) {
  if (!query.trim()) {
    console.log('Порожній запит! Введіть щось для пошуку.');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.hidden = true; // Приховуємо кнопку перед новим запитом

  try {
    const images = await fetchImages(currentQuery, currentPage);
    console.log('Отримані зображення:', images);

    if (images.length === 0) {
      console.log('Нічого не знайдено. Спробуйте інший запит!');
      return;
    }

    renderImages(images);

    console.log('Кількість отриманих зображень:', images.length);
    if (images.length === 15) {
      loadMoreBtn.classList.hidden = false; // Показуємо кнопку, якщо є більше зображень
    } else {
      loadMoreBtn.classList.hidden = true; // Ховаємо, якщо зображень недостатньо
    }
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}

const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);
    if (images.length === 0) {
      console.log('Більше зображень немає!');
      loadMoreBtn.classList.hidden = true; // Ховаємо кнопку, якщо немає більше зображень
      return;
    }
    renderImages(images, true);
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  } finally {
    hideLoader();
  }
});
