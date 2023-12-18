import {showBigPicture} from './bigPicture.js';
import {renderPictures} from'./renderPictures.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) =>{
  container.addEventListener('click', (evt) =>{
    const thumbnail = evt.target.closest('[data-pic-element-id]');
    if(!thumbnail){
      return;
    }
    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.picElementId);
    showBigPicture(picture);
  });
  renderPictures(pictures);
};
export{renderGallery};

