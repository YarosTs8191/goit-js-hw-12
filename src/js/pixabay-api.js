import axios from 'axios';

const API_KEY = '49301647-30570283b511de5f9e60954e8';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

// export async function fetchImages(query) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//     });
//     return response.data.hits;
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     return [];
//   }
// }

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE, // ✅ Додаємо обмеження на 15 зображень
        page: page, // ✅ Передаємо номер сторінки
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
