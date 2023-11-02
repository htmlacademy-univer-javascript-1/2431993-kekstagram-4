import {getRandomNumber, getRandomArrayElement} from './js/util.js';
import {MIN_INDEX_AVATAR, MAX_INDEX_AVATAR, MESSAGES, NAMES} from './js/const.js';

const getComment = (id) => {
  const comment = {
    id,
    avatar: `img/avatar-${getRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
  return comment;
};
export{getComment};
