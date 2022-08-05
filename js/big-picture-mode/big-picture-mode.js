import { isEscape } from '../utils.js';

import {
  addFileInputChangeHandler,
  removeFileInputChangeHandler,
} from '../new-publication/new-publication-form.js';

import { createComment } from './new-comment.js';

import { toggleLike } from './new-like.js';

// Переменные

const COMMENTS_PORTION_LENGTH = 5;
const ACTIVE_CLASS = 'likes-count--active';

let publication;
let loadedComments = 0;

// Элементы DOM

const modalWindowElement = document.querySelector('.big-picture');
const bigPhotoElement = modalWindowElement.querySelector('.big-picture__img img');
const likesCountElement = modalWindowElement.querySelector('.likes-count');
const descriptionElement = modalWindowElement.querySelector('.social__caption');

const commentsContainerElement = modalWindowElement.querySelector('.social__comments');
const commentsElement = commentsContainerElement.querySelectorAll('.social__comment');
const commentsCountElement = modalWindowElement.querySelector('.social__comment-count');
const commentsAmountElement = commentsCountElement.querySelector('.comments-count');
const loadedCommentsAmountElement = commentsCountElement.querySelector('.loaded-comments-count');
const commentsLoaderElement = modalWindowElement.querySelector('.comments-loader');

const closeBtnElement = modalWindowElement.querySelector('#picture-cancel');

const newCommentFormElement = modalWindowElement.querySelector('#create-new-comment');
const newCommentInputElement = modalWindowElement.querySelector('.social__footer-text');


const commentTemplate = commentsElement[0];
commentsElement.forEach((comment) => comment.remove());

// Наполнение окна

/**
 * Заполняет раздел комментариев данными, из массива комментариев.
 * @param {Array} commentsList - массив комментариев
 */
const fillComments = (commentsList) => {
  const commentsFragment = document.createDocumentFragment();
  commentsList.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = comment.avatar;
    picture.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(newComment);
  });

  return commentsFragment;
};

const loadCommentsPortion = (portionAmount) => {
  commentsContainerElement.appendChild(fillComments(publication.comments.slice(loadedComments, loadedComments + portionAmount)));

  loadedComments += portionAmount;

  if (publication.comments.length > loadedComments) {
    commentsLoaderElement.classList.remove('hidden');
  } else {
    commentsLoaderElement.classList.add('hidden');
    commentsLoaderElement.removeEventListener('click', commentsLoaderElementClickHandler);

    loadedComments = publication.comments.length;
  }

  loadedCommentsAmountElement.textContent = loadedComments;
};

/**
 * Заполняет модальное окно информацией из выбранной публикации
 * @param {object} publication - Полная информация об одной публикации
 */
const fillModal = () => {
  loadedComments = 0;

  bigPhotoElement.src = publication.url;
  likesCountElement.textContent = publication.likes;
  if (publication.isLiked === true) {
    likesCountElement.classList.add(ACTIVE_CLASS);
  } else {
    likesCountElement.classList.remove(ACTIVE_CLASS);
  }
  commentsAmountElement.textContent = publication.comments.length;
  loadCommentsPortion(COMMENTS_PORTION_LENGTH);
  descriptionElement.textContent = publication.description;
};

// Управление окном

const closeModal = () => {
  modalWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  addFileInputChangeHandler();

  closeBtnElement.removeEventListener('click', closeBtnElementClickHandler);
  commentsLoaderElement.removeEventListener('click', commentsLoaderElementClickHandler);
  document.removeEventListener('keydown', modalKeydownHandler);
  newCommentFormElement.removeEventListener('submit', createCommentButtonClickHandler);
  likesCountElement.removeEventListener('click', addLikeClickHandler);

  commentsContainerElement.innerHTML = '';
};

/**
 *
 * @param {object} publication - Полная информация об одной публикации
 */
const openModal = () => {
  modalWindowElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  removeFileInputChangeHandler();

  commentsLoaderElement.addEventListener('click', commentsLoaderElementClickHandler);
  closeBtnElement.addEventListener('click', closeBtnElementClickHandler);
  document.addEventListener('keydown', modalKeydownHandler);
  newCommentFormElement.addEventListener('submit', createCommentButtonClickHandler);
  likesCountElement.addEventListener('click', addLikeClickHandler);

  fillModal();
};

const initPublication = (data) => {
  publication = data;
  openModal();
};


// Обработчики

/**
 * Обрабатывает создание нового комментария. Обновляет БД и отображения кол-ва комментариев.
 * @param {object} evt - event
 */
function createCommentButtonClickHandler(evt) {
  evt.preventDefault();
  if (newCommentInputElement.value !== '') {
    publication.comments.unshift(createComment(Math.max(publication.comments[0].id, publication.comments[publication.comments.length - 1].id)));

    loadedComments++;
    loadedCommentsAmountElement.textContent = loadedComments;
    commentsAmountElement.textContent = publication.comments.length;
    document.querySelector(`.picture[data-id="${publication.id}"] .picture__comments`).textContent++;
  }
}

/**
 * Обрабатывает нажатие на лайк
 * @param {object} evt - event
 */
function addLikeClickHandler (evt) {
  evt.preventDefault();
  toggleLike(publication);
}

function closeBtnElementClickHandler() {
  closeModal();
}

function commentsLoaderElementClickHandler() {
  loadCommentsPortion(COMMENTS_PORTION_LENGTH);
}

/**
 * Закрывает модальное окно, если был нажат Escape.
 * @param {object} evt - событие, считанное при нажатии клавиши
 */
function modalKeydownHandler (evt) {
  if (isEscape(evt.code)) {
    evt.preventDefault();
    closeModal();
  }
}

export {
  initPublication,
  fillComments,
};
