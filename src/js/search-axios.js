import axios from 'axios';
import Notiflix from 'notiflix';


const API_KEY = '34649467-390de1e028ed8d04cb8586617';
const BASE_URL = 'https://pixabay.com/api';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

let per_page = 40;
let page = 1;
let searchQuery = '';

// refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    return;
  }
refs.gallery.innerHTML = '';
    page = 1;
  fetchPhoto(searchQuery).then(data => {
    renderPhoto(data);
    page += 1
  });
}

function onLoadMore() {
  
  fetchPhoto(searchQuery).then(data => {
    if ((page) > Math.ceil(data.totalHits / per_page)) {
         refs.loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      return;
  }
    renderPhoto(data);
    page += 1;
  });

}
    
// function fetchPhoto(searchQuery) {

//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page,
//     page,
//   });
  
//   return fetch(`${BASE_URL}/?${params}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
       
//     });
// }

// const fetchPhoto = async () => {
//     try {
//     const params = new URLSearchParams({
//     key: API_KEY,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page,
//     page,
//      });
//     const response = await fetch(`${BASE_URL}/?${params}`);
//     const data = await response.json();
//     return data;
//     } catch (error) {
//         console.log(console.log(error));
//     }
// }

const fetchPhoto = async () => {
    try {
    const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
     });
    const response = await axios.get(`${BASE_URL}/?${params}`);
        return response.data;
    } catch (error) {
        console.log(console.log(error));
    }
}

function renderPhoto(photos) {
  
  const photosArray = photos.hits;
  if (photos.total === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      return;
  } else {
   
     const markup = photosArray.map((photo) => {
return `<div class="photo-card">
    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${photo.downloads}
      </p>
    </div>
  </div> `;
  }).join("");

    refs.gallery.insertAdjacentHTML('beforeend', markup);
  
    refs.loadMoreBtn.style.display = 'block';
  }
}

