import {isEscapeKey} from './utils.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeMessageByEscape);
  document.body.removeEventListener('click', onOutMessageModalClick);
  messageCloseButton.removeEventListener('click', hideMessage);
  message.remove();
};

function closeMessageByEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onOutMessageModalClick (evt) {
  if (!(evt.target.closest('.error__inner') || evt.target.closest('.success__inner'))) {
    hideMessage();
  }
}

const showMessage = (message, messageButton) => {
  document.body.append(message);
  document.addEventListener('keydown', closeMessageByEscape);
  document.body.addEventListener('click', onOutMessageModalClick);
  document.body.querySelector(messageButton).addEventListener('click', hideMessage);
};

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

export {showSuccessMessage, showErrorMessage};
