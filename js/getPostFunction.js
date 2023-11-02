import { getComment } from './js/getCommentFunction.js';
import { getRandomNumber, getRandomArrayElement } from './util.js';
import { DESCRIPTION, MIN_COUNT_LIKES, MAX_COUNT_LIKES, MIN_COUNT_COMMENTS,MAX_COUNT_COMMENTS } from './const.js';

const getPost = (id) => {
  id++;
  const photo = {
    id,
    url: `photos/${id}.jpg` ,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: Array.from({length: getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)},getComment)
  };
  return photo;
};
export{getPost};
