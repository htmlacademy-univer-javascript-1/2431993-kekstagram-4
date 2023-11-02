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

const getComment = (id) => {
  const comment = {
    id,
    avatar: `img/avatar-${getRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
  return comment;
};

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
const generatePosts = () => Array.from({length:COUNT_POSTS}, getPost);
generatePosts();
