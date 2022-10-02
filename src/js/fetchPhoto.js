import Notiflix from 'notiflix';
import axios from 'axios';
import getRefs from './get-refs';
export { FetchPhoto, onFetchError };

const refs = getRefs();


// https://pixabay.com/api/?key=30279426-ce0edf6a31bb607e668c5bb01&q=yellow+flowers&image_type=photo
const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=30279426-ce0edf6a31bb607e668c5bb01&';
const URL = MAIN_URL + API_KEY;

class FetchPhoto {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    try {
      const searchParams = new URLSearchParams({
        q: this.searchQuery,
        per_page: 40,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
      });
      // const OPT_URL = `q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;
      const url = `${URL}${searchParams}`;

      console.log(this.page);

      const response = await axios.get(url);
      return response;

      // .then(function ({ data.hits }) => hits);
      // return (response = await axios.get(url).then(({ articles }) => articles));
    } catch (error) {
      console.error('error in async:', error);
      return onFetchError;
    }
  }

  incrementPage() {
    this.page += 1;
    // if (this.page = 2) {
    //   Notiflix.Notify.success('Hooray! We found totalHits images.');
    // }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

function onFetchError(error) {
  refs.articlesContainer.innerHTML = '';
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
