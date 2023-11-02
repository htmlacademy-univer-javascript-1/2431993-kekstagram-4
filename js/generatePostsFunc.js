import {getPost} from './js/generatePostsFunc.js';

const generatePosts = () => Array.from({length:25}, getPost);
export{generatePosts};
