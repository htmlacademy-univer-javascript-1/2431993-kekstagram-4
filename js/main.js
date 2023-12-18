import {renderGallery} from'.//gallery.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import './upload-form.js';
import './scale.js';
import './nouislider.js';

const loadingPictures = async () => {
  try {
    renderGallery(await getData());
  }
  catch (err){
    showAlert(err.message);
  }
};

loadingPictures();
