// не вдалось зробити з експортом

const API_KEY = '34649467-390de1e028ed8d04cb8586617';
const BASE_URL = 'https://pixabay.com/api';


  
export default function fetchPhoto(searchQuery) {

const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
});

  return fetch(`${BASE_URL}/?${params}`)
    .then(response => response.json());
       
}