import { debounce } from './utils.js';
import { clearPictures } from './renderPictures.js';
import { getRandomNumber } from './utils.js';
import { renderGallery } from './gallery.js';

const filterSection = document.querySelector('.img-filters');
let photos;
let activeButton = filterSection.querySelector('.img-filters__button--active');

function defaultSort() {
  return photos;
}

function randomSort() {
  const photosCopy = [...photos];
  const newPhotos = [];

  for (let i = 0; i < 10; i++) {
    const randomIndex = getRandomNumber(0, photosCopy.length-1);
    const randomPhoto = photosCopy.splice(randomIndex, 1)[0];
    newPhotos.push(randomPhoto);
  }

  return newPhotos;
}


function discussedSort() {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(currentButton, sorting) {
  clearPictures();
  renderGallery(sorting());
  activeButton.classList.remove('img-filters__button--active');
  currentButton.classList.add('img-filters__button--active');
  activeButton = currentButton;
}

function showFilter(data) {
  photos = data;
  filterSection.classList.remove('img-filters--inactive');
  const defButton = filterSection.querySelector('#filter-default');
  const randomButton = filterSection.querySelector('#filter-random');
  const dicsuccedButton = filterSection.querySelector('#filter-discussed');
  defButton.addEventListener('click', debounce(() => applyFilter(defButton, defaultSort)));
  randomButton.addEventListener('click', debounce(() => applyFilter(randomButton, randomSort)));
  dicsuccedButton.addEventListener('click', debounce(() => applyFilter(dicsuccedButton, discussedSort)));
}

export {showFilter};
