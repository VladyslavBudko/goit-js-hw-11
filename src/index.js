import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchPhoto, onFetchError, resetInnerHTML } from './fetchPhoto';
import getRefs from './get-refs';



const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '30279426-ce0edf6a31bb607e668c5bb01';
let query = '';
const OPT_URL = `q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
let URL = MAIN_URL+API_KEY+OPT_URL;

let page = 1;
const per_page = 40;


// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });


async function getUser() {
  try {
    const response = await axios.get(URL);
    console.log('response in assync:', response);
    // const userID = awaid response.json();
    return response;
  } catch (error) {
    console.error('error in async:', error);
  }
}

getUser()
  .then(response => {
    console.log('response in getUser:', response);
    return response;
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    console.log('Всегда');
    // выполняется всегда
  });

// function onFetchError(error) {
//   resetInnerHTML();
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
}


// "We're sorry, but you've reached the end of search results."