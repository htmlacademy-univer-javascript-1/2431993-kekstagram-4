const picStorage = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = function(pictures){
  const picsListFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, likes, comments, id}) => {
    const picElement = picTemplate.cloneNode(true);
    picElement.querySelector('.picture__img').src = url;
    picElement.querySelector('.picture__img').alt = description;
    picElement.querySelector('.picture__comments').textContent = comments.length;
    picElement.querySelector('.picture__likes').textContent = likes;
    picElement.dataset.picElementId = id;
    picsListFragment.appendChild(picElement);
  });

  picStorage.appendChild(picsListFragment);
};

function clearPictures(){
  picStorage.querySelectorAll('.picture').forEach((p) => p.remove());
}

export {renderPictures, clearPictures};
