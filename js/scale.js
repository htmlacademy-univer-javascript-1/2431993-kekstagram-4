const SCALE_STEP =25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const scaleCounter = modalElement.querySelector('.scale__control--value');
const scaleMinusButton = modalElement.querySelector('.scale__control--smaller');
const scalePlusButton = modalElement.querySelector('.scale__control--bigger');
const photoPreview = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) =>{
  photoPreview.style.transform = `scale(${value/100})`;
  scaleCounter.value = `${value}%`;

};

const onSmallerButtonClick = () =>{
  scaleImage(parseInt(scaleCounter.value, 10) - SCALE_STEP > 0? parseInt(scaleCounter.value, 10) - SCALE_STEP: MIN_SCALE);

};

const onBiggerButtonClick = () =>{
  scaleImage(parseInt(scaleCounter.value, 10) + SCALE_STEP <= 100 ? parseInt(scaleCounter.value, 10) + SCALE_STEP: MAX_SCALE);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleMinusButton.addEventListener('click', onSmallerButtonClick);
scalePlusButton.addEventListener('click', onBiggerButtonClick);
