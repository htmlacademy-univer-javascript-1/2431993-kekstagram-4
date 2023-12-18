import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsVisibleCount = bigPictureElement.querySelector('.comments-visible-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.social__comment');
const COUNT_DOWNLOD_COMMENTS = 5;

const createComment = ({avatar, name, message}) =>{
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  if(COUNT_DOWNLOD_COMMENTS >= comments.length){
    commentsLoaderElement.classList.add('hidden');
  }else{
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  comments.forEach((item, index) => {
    const comment = createComment(item);

    if (index < COUNT_DOWNLOD_COMMENTS) {
      comment.classList.remove('hidden');
    } else {
      comment.classList.add('hidden');
    }

    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

const hideBigPicture = () => {
  commentsLoaderElement.classList.remove('hidden');
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onCancelButtonClick);
};

function onDocumentKeyDown(evt){
  if(isEscapeKey(evt)){
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick () {
  hideBigPicture();
}

const renderPictureDetails = ({url, likes, description}) =>{
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  bigPictureCommentsVisibleCount.textContent = data.comments.length < COUNT_DOWNLOD_COMMENTS ? data.comments.length : COUNT_DOWNLOD_COMMENTS;
  bigPictureCommentsCount.textContent = data.comments.length;

  renderPictureDetails(data);
  renderComments(data.comments);

};

const updateCurrentSocialComments = (commentsVisibleLenght) => {
  bigPictureCommentsVisibleCount.textContent = commentsVisibleLenght;

  if (commentsVisibleLenght < commentListElement.childElementCount) {
    commentsLoaderElement.classList.remove('hidden');
  } else {
    commentsLoaderElement.classList.add('hidden');
  }
};

const loadComments =() => {
  for (let i = 0; i < COUNT_DOWNLOD_COMMENTS; i++) {
    const hiddenSocialComment = commentListElement.querySelector('.hidden');
    if (hiddenSocialComment !== null) {
      hiddenSocialComment.classList.remove('hidden');
    }
  }
  const hiddenSocialCommentsLength = commentListElement.querySelectorAll('.hidden').length;
  const commentsVisibleLenght = commentListElement.childElementCount - hiddenSocialCommentsLength;
  updateCurrentSocialComments(commentsVisibleLenght);
};

cancelButtonElement.addEventListener('click', () =>{
  onCancelButtonClick();
});
commentsLoaderElement.addEventListener('click', () => {
  loadComments();
});

export{showBigPicture};
