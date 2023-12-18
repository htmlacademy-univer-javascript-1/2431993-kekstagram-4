import { pristine } from './validate-form.js';
import { resetScale } from './scale.js';
import { resetEffects } from './nouislider.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { isEscapeKey } from './utils.js';

const privewList = document.querySelectorAll('.effects__preview');
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imageEditor = document.querySelector('.img-upload__overlay');
const imageEditorPreview = document.querySelector('.img-upload__preview img');
const editorCloser = document.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');


const hideModal = () => {
  if(hashtagInput !== document.activeElement &&
    descriptionInput !== document.activeElement)
  {
    imageEditor.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeyDown);
    editorCloser.removeEventListener('click', hideModal);
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    resetScale();
    pristine.reset();
    resetEffects();
  }
};

function onDocumentKeyDown (evt){
  const errorMessage = document.querySelector('.error');
  if(isEscapeKey(evt) && !errorMessage){
    evt.preventDefault();
    hideModal();
  }
}
fileInput.addEventListener('change', ()=>{
  imageEditor.classList.remove('hidden');
  imageEditorPreview.src = URL.createObjectURL(fileInput.files[0]);
  imageEditorPreview.style = 'width:100%;height:100%;object-fit:cover';
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  editorCloser.addEventListener('click', hideModal);
});

uploadForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    submitButton.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccessMessage();
        hideModal();
      })
      .catch(() => showErrorMessage());
    submitButton.disabled = false;
  }
});
