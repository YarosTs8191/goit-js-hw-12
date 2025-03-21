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
  currentPage = 1; // Скидаємо пагінацію при новому запиті
  document.querySelector('.load-more').style.display = 'none'; // Ховаємо кнопку перед новим запитом

  try {
    const images = await fetchImages(currentQuery, currentPage);
    console.log('Отримані зображення:', images);

    if (images.length === 0) {
      console.log('Нічого не знайдено. Спробуйте інший запит!');
      return;
    }

    console.log('Перед рендерингом!');
    renderImages(images);
    if (images.length === 15) {
      document.querySelector('.load-more').style.display = 'block';
    } else {
      document.querySelector('.load-more').style.display = 'none';
    } // Показуємо кнопку після завантаження
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage += 1; // Збільшуємо номер сторінки
  showLoader(); // Показуємо лоадер під кнопкою "Load more"

  try {
    const images = await fetchImages(currentQuery, currentPage);
    if (images.length === 0) {
      console.log('Більше зображень немає!');
      document.querySelector('.load-more').style.display = 'none'; // Ховаємо кнопку, якщо зображень більше немає
      return;
    }
    renderImages(images, true); // Додаємо нові зображення до галереї
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  } finally {
    hideLoader(); // Ховаємо лоадер після завантаження
  }
});
