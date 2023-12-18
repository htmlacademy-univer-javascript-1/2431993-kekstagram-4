import { renderGallery } from'.//gallery.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { showFilter } from './filter.js';
import './upload-form.js';
import './scale.js';
import './nouislider.js';

const loadingPictures = async () => {
  try {
    const data = await getData();
    renderGallery(data);
    showFilter(data);
  }
  catch (err){
    showAlert(err.message);
  }
};

loadingPictures();
