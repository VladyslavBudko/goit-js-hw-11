// {{#each this}}
//   <div class='photo-card'>
//     <img src='{{webformatURL}}' alt='{{tags}}' loading='lazy' />
//     <div class='info'>
//       <p class='info-item'>
//         <b>{{likes}}</b>
//       </p>
//       <p class='info-item'>
//         <b>{{views}}</b>
//       </p>
//       <p class='info-item'>
//         <b>{{comments}}</b>
//       </p>
//       <p class='info-item'>
//         <b>{{downloads}}</b>
//       </p>
//     </div>
//   </div>
// {{/each}}

 export default function articlesTpl(photo) {
  return photo
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
      <div class='photo-card'>
      <img src='${webformatURL}' alt='${tags}' loading='lazy' />
      <div class='info'>
        <p class='info-item'>
          <b>${likes}</b>
        </p>
        <p class='info-item'>
          <b>${views}</b>
        </p>
        <p class='info-item'>
          <b>${comments}</b>
        </p>
        <p class='info-item'>
          <b>${downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}