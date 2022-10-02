import Notiflix from 'notiflix';
import axios from 'axios';
export { FetchPhoto, onFetchError, resetInnerHTML };

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
      });
      // const OPT_URL = `q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;
      const url = `${URL}${searchParams}`;

      return (response = await axios.get(url).then(({ articles }) => articles));
      // return (response = await axios.get(url).then(({ articles }) => articles));

    } catch (error) {
      console.error('error in async:', error);
      return onFetchError;
    }
  }

  incrementPage() {
    this.page += 1;
    if (this.page = 2) {
      Notiflix.Notify.success('Hooray! We found totalHits images.');
    }
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

  // return fetch(URL)
  //   .then(response => {
  //     if (!response.ok) {
  //       return onFetchError;
  //     }
  //     return response.json();
  //   })
  //   .catch(onFetchError);
}

// async function fetchPhoto(name) {
//   try {
//     const response = await axios.get('/user?ID=12');
//     console.log('response in assync:', response);
//     // const userID = awaid response.json();
//     return response;
//   } catch (error) {
//     console.error('error in async:', error);
//   }
// }

// getUser()
//   .then(response => {
//     console.log('response in getUser:', response);
//     return response;
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
// .then(function () {
//   console.log('Всегда');
//   // выполняется всегда
// });

function onFetchError(error) {
  // resetInnerHTML();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );

  // function resetInnerHTML() {
  //   refs.countryListEl.innerHTML = '';
  //   refs.countryInfoEl.innerHTML = '';
  // }
}
