import {MIN_INDEX_AVATAR, MAX_INDEX_AVATAR,MESSAGES, NAMES, MIN_ID_PHOTO, MAX_ID_PHOTO, DESCRIPTION, MIN_COUNT_LIKES, MAX_COUNT_LIKES, MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS, COUNT_POSTS} from './data';

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

const getComment = () => ({
  id: createRandomUniqueNum(1,1000),
  avatar: `img/avatar-${getRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const getPost = () => ({
  id: createRandomUniqueNum(MIN_ID_PHOTO, MAX_ID_PHOTO),
  url: `photos/${getRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.jpg` ,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({length: getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)},getComment)

});
const getPhotos = () => Array.from({length:COUNT_POSTS}, getPost);
getPhotos();

export{getRandomNumber, getRandomArrayElement, createRandomUniqueNum};

export {getPhotos};

