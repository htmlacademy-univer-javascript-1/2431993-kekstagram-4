import { pristine } from './validate-form.js';
import {resetScale} from './scale.js';
import {resetEffects} from './nouislider.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imageEditor = document.querySelector('.img-upload__overlay');
const imageEditorPreview = document.querySelector('.img-upload__preview img');
const editorCloser = document.querySelector('.img-upload__cancel');


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
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hideModal();
  }
}

fileInput.addEventListener('change', ()=>{
  imageEditor.classList.remove('hidden');
  imageEditorPreview.src = URL.createObjectURL(fileInput.files[0]);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  editorCloser.addEventListener('click', hideModal);
});

uploadForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    uploadForm.submit();
  }
});
