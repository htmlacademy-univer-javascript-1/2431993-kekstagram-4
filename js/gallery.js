import {showBigPicture} from './bigPicture.js';
import {renderPictures} from'./renderPictures.js';
import {getPhotos} from './utils.js';

const container = document.querySelector('.pictures');

const photos = getPhotos();

const renderGallery = () =>{
  container.addEventListener('click', (evt) =>{
    const thumbnail = evt.target.closest('[data-pic-element-id]');
    if(!thumbnail){
      return;
    }
    evt.preventDefault();
    const picture = photos.find((item) => item.id === +thumbnail.dataset.picElementId);

    if(!picture){
      throw Error('Такого элемента не существует')
    }

    showBigPicture(picture);
  });
  renderPictures(photos);
};
export{renderGallery};

