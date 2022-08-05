import { fillComments } from './big-picture-mode.js';

const newCommentFormElement = document.querySelector('#create-new-comment');
const commentInputElement = newCommentFormElement.querySelector('.social__footer-text');
const commentsContainerElement = document.querySelector('.social__comments');

/**
 * Создает элемент с информацией о новом комментарии, добавляет его на страницу
 * @param {number} lastId - id последнего существующего комментария
 * @returns - информация о комментарии
 */
function createComment(lastId) {
  const commentInfo = {
    id: ++lastId,
    avatar: 'img/avatar-6.svg',
    message: commentInputElement.value,
    name: 'Ваше имя'
  };

  const comment = fillComments([commentInfo]);
  commentsContainerElement.prepend(comment);
  commentInputElement.value = '';

  return commentInfo;
}

export{
  createComment,
};
