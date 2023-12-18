const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;
const MAX_PHOTO_URL_ID = 25;
const MIN_INDEX_AVATAR = 1;
const MAX_INDEX_AVATAR = 6;
const COUNT_POSTS = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'];

const NAMES = ['Иван','Александр','Елизавета','Дарья', 'Сергей','Георгий'];

const  DESCRIPTION = ['Прекрасная', 'Удивительная', 'Замечательная','Волшебная'];

const getRandomNumber = (min,max) =>{
  const lower = Math.ceil(Math.min(min,max));
  const upper = Math.floor(Math.max(min,max));
  const result = Math.random() * (upper-lower+1 ) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createRandomUniqueNum = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getCommentId = createRandomUniqueNum(1,1000);
const getPhotoId = createRandomUniqueNum(MIN_ID_PHOTO,MAX_ID_PHOTO);
const getUrlId = createRandomUniqueNum(1,MAX_PHOTO_URL_ID);

const getComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const getPost = () => ({
  id: getPhotoId(),
  url: `photos/${getUrlId()}.jpg` ,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({length: getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)},getComment)

});

const isEscapeKey = (evt) => evt.key === 'Escape';

const getPhotos = () => Array.from({length:COUNT_POSTS}, getPost);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export{getPhotos, isEscapeKey, showAlert, debounce, getRandomNumber};

