export default function getRefs() {
  return {
    formEl: document.querySelector('#search-form'),
    // photoListEl: document.querySelector('[type="text"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    moreBtn: document.querySelector('.load-more'),
  };
}
