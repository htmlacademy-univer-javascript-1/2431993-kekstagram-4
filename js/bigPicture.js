import {isEscapeKey} from './util.js';
import {similarPhotos, photoDrawing} from './drawing.js';

photoDrawing();

const bigPictures = document.querySelector('.big-picture');
const closeButton = bigPictures.querySelector('.big-picture__cancel');
const bigPicture = bigPictures.querySelector('.big-picture__img');
const pictures = document.querySelectorAll('.picture__img');

const socialCommentsCount = document.querySelector('.current-comments-count');
const buttonCommentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const socialComments = document.querySelector('.social__comments');

const createComments = (comments) => {

  comments.forEach(({avatar, message, name}) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.classList.add('hidden');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    avatarImg.width = '35';
    avatarImg.height = '35';
    comment.appendChild(avatarImg);

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = message;
    comment.appendChild(text);

    socialComments.appendChild(comment);
  });
  downloadComments();
};

const createBigPicture = (index) => {
  const photo = similarPhotos[index];
  bigPicture.querySelector('img').src = photo.url;
  bigPictures.querySelector('.likes-count').textContent = photo.likes;
  bigPictures.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictures.querySelector('.social__caption').textContent = photo.description;

  createComments(photo.comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureWindow();
  }
};

function openBigPictureWindow() {
  bigPictures.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPictureWindow() {
  bigPictures.classList.add('hidden');
  body.classList.remove('modal-open');

  const commentsList = document.querySelectorAll('.social__comment');
  for( let i = 0; i < commentsList.length; i++ ){
    commentsList[i].outerHTML = '';
  }

  document.removeEventListener('keydown', onDocumentKeydown);
}

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    openBigPictureWindow();
    createBigPicture(i);
  });
}

closeButton.addEventListener('click', () => {
  closeBigPictureWindow();
});

buttonCommentsLoader.addEventListener('click', () => {
  downloadComments();
});

function updateCurrentSocialCommentsCount(visibleSocialCommentsLenght) {
  socialCommentsCount.textContent = visibleSocialCommentsLenght;

  if (visibleSocialCommentsLenght < socialComments.childElementCount) {
    buttonCommentsLoader.classList.remove('hidden');
  } else {
    buttonCommentsLoader.classList.add('hidden');
  }
}

function downloadComments() {
  for (let i = 0; i < 5; i++) {
    const hiddenSocialComment = socialComments.querySelector('.hidden');
    if (hiddenSocialComment !== null) {
      hiddenSocialComment.classList.remove('hidden');
    }
  }
  const hiddenSocialComments = socialComments.querySelectorAll('.hidden');
  const hiddenSocialCommentsLength = hiddenSocialComments.length;
  const visibleSocialCommentsLenght = socialComments.childElementCount - hiddenSocialCommentsLength;

  updateCurrentSocialCommentsCount(visibleSocialCommentsLenght);
}
