import {getPost} from './js/generatePostsFunc.js';

const createPosts = () => Array.from({length:25}, getPost);
export{createPosts};
