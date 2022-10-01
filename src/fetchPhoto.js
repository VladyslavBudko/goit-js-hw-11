import Notiflix from 'notiflix';
import getRefs from './get-refs';
export { fetchPhoto, onFetchError, resetInnerHTML };

const refs = getRefs();

function fetchPhoto(name) {
  const base_url = `https://restcountries.com/v3.1/name/${name}`;
  const filter_url = `?fields=name,capital,population,flags,languages`;
  return fetch(base_url + filter_url)
    .then(response => {
      if (!response.ok) {
        return onFetchError;
      }
      return response.json();
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  resetInnerHTML();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );

function resetInnerHTML() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}
