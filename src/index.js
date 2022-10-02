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
  fetchPhoto.fetchArticles().then(hits => {
    console.log(`hits:`, hits);
    console.log(`hits.data:`, hits.data);
    console.log(`hits.data.hits:`, hits.data.hits);

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
      fetchPhoto.fetchArticles().then(hits => {
        appendArticlesMarkup(hits.data.hits);
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

// Notiflix.Notify.info(
//   "We're sorry, but you've reached the end of search results."
// );
