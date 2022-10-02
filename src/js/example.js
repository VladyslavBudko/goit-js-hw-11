import axios from 'axios';

{/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */}


// "Sorry, there are no images matching your search query. Please try again."


// Список параметров строки запроса которые тебе обязательно необходимо указать:

// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.





// const axios = require('axios');

// // Делаем запрос пользователя с данным ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // обработка успешного запроса
//     console.log(response);
//   })
//   .catch(function (error) {
//     // обработка ошибки
//     console.log(error);
//   })
//   .then(function () {
//     // выполняется всегда
//   });

// По желанию вышеуказанный запрос можно выполнить так
axios
  .get('/user', {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log('response 1:', response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // выполняется всегда
  });


  
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12');
    console.log('response in assync:', response);
    // const userID = awaid response.json();
    return response;
  } catch (error) {
    console.error('error in async:', error);
  }
}

getUser()
  .then( response => {
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


  axios.get('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });