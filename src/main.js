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
  currentQuery = query;
  currentPage = 1;
  loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку перед новим пошуком

  const { images, totalHits } = await fetchImages(currentQuery, currentPage);
  hideLoader();

  if (images.length === 0) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  } else {
    renderImages(images);

    if (currentPage * 15 < totalHits) {
      // ✅ Перевіряємо, чи є ще зображення
      loadMoreBtn.classList.remove('hidden'); // ✅ Кнопка з’являється тільки якщо ще є що завантажувати
    }
  }
});

// ********************* Пагінація **********************
let currentPage = 1;
let currentQuery = '';
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const { images, totalHits } = await fetchImages(currentQuery, currentPage);
    hideLoader();

    if (images.length === 0) {
      console.log('Більше зображень немає!');
      loadMoreBtn.classList.add('hidden');
      showError("We're sorry, but you've reached the end of search results.");
      return;
    }

    renderImages(images, true);

    if (currentPage * 15 >= totalHits) {
      // ✅ Тепер перевірка точна
      console.log('🔚 Кінець колекції! Ховаємо кнопку.');
      loadMoreBtn.classList.add('hidden');
      showError("We're sorry, but you've reached the end of search results."); // ✅ Додаємо повідомлення ще раз
    }

    // Прокрутка сторінки після завантаження нових зображень
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
    hideLoader();
  }
});
