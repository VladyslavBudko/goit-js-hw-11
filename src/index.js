// import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchPhoto, onFetchError, resetInnerHTML } from './js/fetchPhoto';
import getRefs from './js/get-refs';
import articlesTpl from './js/articles';

const refs = getRefs();
const fetchPhoto = new FetchPhoto();

refs.submitBtn.classList.add('btn');

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  fetchPhoto.query = event.currentTarget.elements.searchQuery.value;

  if (fetchPhoto.query === '') {
    return onFetchError();
    // alert('Введи что-то нормальное');
  }

  fetchPhoto.resetPage();
  clearArticlesContainer();
  fetchPhoto.fetchArticles().then(hits => {
    if (hits.data.total === 0) {
      return onFetchError();
    }
    appendArticlesMarkup(hits.data.hits);
    fetchPhoto.incrementPage();
  });
}

function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && fetchPhoto.query !== '') {
      fetchPhoto.incrementPage();
      fetchPhoto.fetchArticles().then(hits => {
        appendArticlesMarkup(hits.data.hits);
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.moreBtn);
// observer.observe(refs.sentinel);

// Notiflix.Notify.info(
//   "We're sorry, but you've reached the end of search results."
// );
