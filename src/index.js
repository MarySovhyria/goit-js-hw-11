import axios from "axios";
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

loadMore.style.display = 'none';

let page = 1;
let perPage = 40;

searchForm.addEventListener('submit', handleForm);
loadMore.addEventListener('click', loadMorePhotos)

async function handleForm(evnt) {

    evnt.preventDefault();
    
    const searchQuery = evnt.target.searchQuery.value;
    page = 1;
    

    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: '28308066-7b7c2efd8f29cbaa75a1bd301',
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,

        },
    })
    const data = response.data;
    if (data.hits.length === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        return;
    } 

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    imageList.innerHTML = '';
    loadMore.style.display = "block"
    data.hits.forEach(image => {
        const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');

            const img = document.createElement('img');
            img.src = image.webformatURL;
            img.alt = image.tags;
            img.loading = 'lazy';

            const info = document.createElement('div');
            info.classList.add('info');

            const likes = document.createElement('p');
            likes.classList.add('info-item');
            likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

            const views = document.createElement('p');
            views.classList.add('info-item');
            views.innerHTML = `<b>Views:</b> ${image.views}`;

            const comments = document.createElement('p');
            comments.classList.add('info-item');
            comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

            const downloads = document.createElement('p');
            downloads.classList.add('info-item');
            downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

            info.appendChild(likes);
            info.appendChild(views);
            info.appendChild(comments);
            info.appendChild(downloads);

            photoCard.appendChild(img);
            photoCard.appendChild(info);

            imageList.appendChild(photoCard);
        });
}
catch(error) {
    console.log(error);
    Notiflix.Notify.failure('Error fetching data. Please try again later.');
}
}

async function loadMorePhotos() {
    page ++;

    try {
        const searchQuery = searchForm.searchQuery.value;
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: '28308066-7b7c2efd8f29cbaa75a1bd301',
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,
            },
        });

        const data = response.data;

        if (data.hits.length === 0) {
            loadMore.style.display = 'none';
            return;
        }

        data.hits.forEach(image => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');

            const img = document.createElement('img');
            img.src = image.webformatURL;
            img.alt = image.tags;
            img.loading = 'lazy';

            const info = document.createElement('div');
            info.classList.add('info');

            const likes = document.createElement('p');
            likes.classList.add('info-item');
            likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

            const views = document.createElement('p');
            views.classList.add('info-item');
            views.innerHTML = `<b>Views:</b> ${image.views}`;

            const comments = document.createElement('p');
            comments.classList.add('info-item');
            comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

            const downloads = document.createElement('p');
            downloads.classList.add('info-item');
            downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

            info.appendChild(likes);
            info.appendChild(views);
            info.appendChild(comments);
            info.appendChild(downloads);

            photoCard.appendChild(img);
            photoCard.appendChild(info);

            imageList.appendChild(photoCard);
        })
        
    } catch (error) {
        console.error('Error fetching data:', error);
        Notiflix.Notify.failure('Error fetching data. Please try again later.');
    }
}
