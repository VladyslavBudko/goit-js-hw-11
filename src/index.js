// import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchPhoto, onFetchError, resetInnerHTML } from './js/fetchPhoto';
import getRefs from './js/get-refs';
import articlesTpl from './js/articles';

const refs = getRefs();
const fetchPhoto = new FetchPhoto();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  
  console.log(event.currentTarget.elements.searchQuery.value);
  fetchPhoto.query = event.currentTarget.elements.searchQuery.value;

  if (fetchPhoto.query === '') {
    return onFetchError();
    // alert('Введи что-то нормальное');
  }

  fetchPhoto.resetPage();
  clearArticlesContainer();
  fetchPhoto.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    fetchPhoto.incrementPage();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

// function getRefs() {
//   return {
//     searchForm: document.querySelector('.js-search-form'),
//     articlesContainer: document.querySelector('.js-articles-container'),
//     sentinel: document.querySelector('#sentinel'),
//   };
// }

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && fetchPhoto.query !== '') {
      fetchPhoto.fetchArticles().then(articles => {
        appendArticlesMarkup(articles);
        fetchPhoto.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.submitBtn);
// observer.observe(refs.sentinel);


Notiflix.Notify.info(
  "We're sorry, but you've reached the end of search results."
);
