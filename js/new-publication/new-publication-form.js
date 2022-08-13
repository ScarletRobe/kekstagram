import { isEscape } from '../utils.js';

import {
  showUploadStatusMessage,
} from '../new-publication/upload-status-modal.js';

import {
  validateUploadForm,
  resetUploadFormValidator,
} from './new-publication-validation.js';

import {
  changeScaleClickHandler,
  effectsListClickHandler,
  resetPreviewPhoto,
  hideSlider,
} from './new-publication-effects.js';

import { sendUploadFormData } from '../web-api/ajax-requests.js';

import { createNewPublication } from './new-publication-render.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Элементы DOM

const formElement = document.querySelector('#upload-select-image');
const fileInputElement = formElement.querySelector('#upload-file');
const uploadFormElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const cancelBtnElement = uploadFormElement.querySelector('#upload-cancel');

const uploadSubmitBtnElement = formElement.querySelector('#upload-submit');

const scaleElement = document.querySelector('.scale');
const effectsListElement = document.querySelector('.effects__list');

//

const changePreviewPhoto = () => {
  if (!FILE_TYPES.some((type) => fileInputElement.files[0].name.toLowerCase().endsWith(type))) {
    return false;
  }

  imgPreviewElement.src = URL.createObjectURL(fileInputElement.files[0]);
  effectsListElement.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = `url(${imgPreviewElement.src}`;
  });
  return true;
};

// Управление формой

const openForm = () => {
  if (!changePreviewPhoto()) {
    return;
  }

  uploadSubmitBtnElement.disabled = false;
  uploadFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  scaleElement.addEventListener('click', changeScaleClickHandler);
  effectsListElement.addEventListener('click', effectsListClickHandler);

  formElement.addEventListener('submit', formSubmitHandler);
  cancelBtnElement.addEventListener('click', cancelBtnElementClickHandler);
  document.addEventListener('keydown', formKeydownHandler);
};

/**
 *
 * @param {boolean} isClearForm - Требуется ли очистить форму?
 */
function closeForm (isClearForm = true) {
  uploadFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  if (isClearForm) {
    resetUploadFormValidator();
    resetPreviewPhoto();
    hideSlider();
    formElement.reset();
  }

  fileInputElement.value = '';

  scaleElement.removeEventListener('click', changeScaleClickHandler);
  effectsListElement.removeEventListener('click', effectsListClickHandler);

  formElement.removeEventListener('submit', formSubmitHandler);
  cancelBtnElement.removeEventListener('click', cancelBtnElementClickHandler);
  document.removeEventListener('keydown', formKeydownHandler);
}

// Обработчики для формы

function cancelBtnElementClickHandler() {
  closeForm();
}

const successUploadHandler = (data) => {
  const formData = data;
  return () => {
    createNewPublication(formData);
    showUploadStatusMessage(true);
    closeForm(true);
  };
};

const failureUploadHandler = () => {
  showUploadStatusMessage(false);
  uploadSubmitBtnElement.disabled = false;

  document.removeEventListener('keydown', formKeydownHandler);
};

/**
 * Проверяет заполнение формы. Отправляет, если все соответствует.
 * @param {object} evt - event
 */
function formSubmitHandler (evt) {
  evt.preventDefault();
  if (validateUploadForm()) {
    const formData = new FormData(formElement);
    uploadSubmitBtnElement.disabled = true;
    uploadSubmitBtnElement.textContent = 'Ваша фотография публикуется...';
    sendUploadFormData(formData, successUploadHandler(formData), failureUploadHandler);

    uploadSubmitBtnElement.textContent = 'Опубликовать';
  }
}

/**
 * Закрывает форму при нажатии Escape
 * @param {object} evt - event
 */
function formKeydownHandler (evt) {
  if (!(evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description'))) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      closeForm();
    }
  }
}

// Обработчики

const addFileInputChangeHandler = () => fileInputElement.addEventListener('change', fileInputElementChangeHandler);

const removeFileInputChangeHandler = () => fileInputElement.removeEventListener('change', fileInputElementChangeHandler);

function fileInputElementChangeHandler() {
  openForm();
}

export {
  addFileInputChangeHandler,
  removeFileInputChangeHandler,
  closeForm,
  formKeydownHandler
};
