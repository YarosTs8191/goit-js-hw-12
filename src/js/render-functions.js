import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images, append = false) {
  if (!append) {
    gallery.innerHTML = ''; // Очищаємо галерею тільки при першому запиті
  }

  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
        <li class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p>❤️ ${likes} Likes</p>
                <p>👁️ ${views} Views</p>
                <p>💬 ${comments} Comments</p>
                <p>⬇️ ${downloads} Downloads</p>
            </div>
        </li>
      `
      )
      .join('')
  );

  lightbox.refresh();
}

// export function renderImages(images) {
//   gallery.innerHTML = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//         <li class="gallery-item">
//             <a href="${largeImageURL}">
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             </a>
//             <div class="info">
//                 <p>❤️ ${likes} Likes</p>
//                 <p>👁️ ${views} Views</p>
//                 <p>💬 ${comments} Comments</p>
//                 <p>⬇️ ${downloads} Downloads</p>
//             </div>
//         </li>
//     `
//     )
//     .join('');
//   lightbox.refresh();
// }

export function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('visible');
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}
