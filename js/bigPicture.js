const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCommentsCount = bigPictureElement.querySelector('.comments-count');
const bigPictureCommentsVisibleCount = bigPictureElement.querySelector('.comments-visible-count');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.social__comment');
let MAX_VISIBLE_COUNT= 5;

const createComment = ({avatar, name, message}) =>{
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) =>{
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentListElement.append(fragment);
};

// const loadComments = (maxVisibleComment, data) =>{
//   if(maxVisibleComment + maxVisibleComment > data.comments.length){
//     bigPictureCommentsVisibleCount.textContent = data.comments.length;
//     maxVisibleComment = data.comments.length;
//     commentsLoaderElement.classList.add('hidden');
//   }else{
//     bigPictureCommentsVisibleCount.textContent = maxVisibleComment += MAX_VISIBLE_COUNT;
//   }
//   renderComments([...data.comments].splice(0,maxVisibleComment));
// };

const hideBigPicture = () => {
  // commentsLoaderElement.removeEventListener('click', loadComments);
  commentsLoaderElement.classList.remove('hidden');
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown(evt){
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = (data) =>{
  bigPictureElement.querySelector('.big-picture__img img').src = data.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = data.description;
  bigPictureElement.querySelector('.likes-count').textContent = data.likes;
  bigPictureElement.querySelector('.social__caption').textContent = data.description;
};

const showBigPicture = (data) => {
  let maxcount = 5;
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  renderPictureDetails(data);
  bigPictureCommentsCount.textContent = data.comments.length;
  bigPictureCommentsVisibleCount.textContent = data.comments.length < MAX_VISIBLE_COUNT ? data.comments.length : MAX_VISIBLE_COUNT;
  if(MAX_VISIBLE_COUNT >= data.comments.length){
    commentsLoaderElement.classList.add('hidden');
  }
  commentsLoaderElement.addEventListener('click', () =>{
    if(maxcount + maxcount > data.comments.length){
      bigPictureCommentsVisibleCount.textContent = data.comments.length;
      maxcount = data.comments.length;
      commentsLoaderElement.classList.add('hidden');
    }else{
      bigPictureCommentsVisibleCount.textContent = maxcount += 5;
    }
    renderComments([...data.comments].splice(0,maxcount));
  })
  renderComments([...data.comments].splice(0,maxcount));
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export{showBigPicture};
