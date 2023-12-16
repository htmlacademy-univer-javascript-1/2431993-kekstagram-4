const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const hashtagTemplate = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
let hashtagErrorMessage;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'hashtag__error',
});

const isHashtagsValid = () =>{
  const hashtagCounter = hashtagInput.value.split(' ').map((hashtag) => hashtag.toLowerCase());
  if(new Set(hashtagCounter).size !== hashtagCounter.length){
    hashtagErrorMessage = 'Хэш-теги повторяются';
    return false;
  }
  for(let hashtag of hashtagCounter){
    hashtag = hashtag.toLowerCase();
    if(hashtag.split('#').length > 2 || (!hashtagTemplate.test(hashtag) && hashtag !== '')){
      hashtagErrorMessage = 'Введён невалидный хэш-тег';
      return false;
    } else if (hashtagCounter.length > MAX_HASHTAGS){
      hashtagErrorMessage = `Хэш-тегов может быть не более ${MAX_HASHTAGS} штук`;
      return false;
    }
  }
  return true;
};

const createErrorMessage = () => hashtagErrorMessage;
pristine.addValidator(hashtagInput,isHashtagsValid,createErrorMessage,1 , false);

export {pristine};
