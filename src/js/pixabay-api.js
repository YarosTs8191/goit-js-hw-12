import axios from 'axios'; // ✅ Додаємо імпорт axios

const API_KEY = '49301647-30570283b511de5f9e60954e8';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
      },
    });

    console.log('📸 API Response:', response.data); // ✅ Додано для перевірки

    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return { images: [], totalHits: 0 };
  }
}
