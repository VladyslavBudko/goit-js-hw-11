// import axios from 'axios';
import Notiflix from 'notiflix';
import { FetchPhoto, onFetchError, resetInnerHTML } from './js/fetchPhoto';
import getRefs from './js/get-refs';
import articlesTpl from './js/articles';

const refs = getRefs();
const fetchPhoto = new FetchPhoto();

refs.submitBtn.classList.add('button');
refs.moreBtn.classList.add('button', 'is-hidden');

refs.moreBtn.addEventListener('click', topFunction);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  fetchPhoto.query = event.currentTarget.elements.searchQuery.value.trim();

  if (fetchPhoto.query === '') {
    Notiflix.Notify.info(`Enter search data, please`);
    return onFetchError();
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

  // if !!!!!!!!!
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
observer.observe(refs.sentinel);

