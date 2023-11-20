import {getPhotos} from './utils.js';

const picStorage = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture').content;

const photos = getPhotos();

const picsListFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const picElement = picTemplate.cloneNode(true);
  picElement.querySelector('.picture__img').src = url;
  picElement.querySelector('.picture__img').alt = description;
  picElement.querySelector('.picture__comments').textContent = comments;
  picElement.querySelector('.picture__likes').textContent = likes;
  picsListFragment.appendChild(picElement);

});

picStorage.appendChild(picsListFragment);
