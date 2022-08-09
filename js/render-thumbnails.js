import { initPublication } from './big-picture-mode/big-picture-mode.js';

import { toggleLike } from './big-picture-mode/new-like.js';

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

/**
 * Отрисовывает миниатюры
 * @param {array} publications - массив публикаций
 */
const renderThumbnails = (publications) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

  const thumbnailsFragment = document.createDocumentFragment();
  publications.forEach((publication) => {
    const newThumbnail = thumbnailTemplateElement.cloneNode(true);

    newThumbnail.dataset.id = publication.id;
    newThumbnail.querySelector('.picture__img').src = publication.url;
    newThumbnail.querySelector('.picture__likes').textContent = publication.likes;
    newThumbnail.querySelector('.picture__comments').textContent = publication.comments.length;
    if (publication.isLiked) {
      newThumbnail.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).classList.add('picture__likes--active');
    }

    thumbnailsFragment.appendChild(newThumbnail);
  });

  picturesContainerElement.appendChild(thumbnailsFragment);
};

/**
 * Инициализирует работу миниатюр. Производит первую загрузку
 * @param {array} publications - массив публикаций
 */
const initThumbnails = (publications) => {
  picturesContainerElement.addEventListener('click', getThumbnailsContainerClickHandler(publications));
  renderThumbnails(publications);
};

// Обработчики

/**
 *
 * @param {array} publications - массив публикаций
 * @returns функция-обработчик события клик на миниатюру
 */
function getThumbnailsContainerClickHandler (publications) {
  return (evt) => {
    if (evt.target.closest('.picture') !== null) {
      evt.preventDefault();
      if (evt.target.matches('.picture__likes')) {
        toggleLike(publications.find((publication) => publication.id === Number(evt.target.closest('.picture').dataset.id)));
      } else {
        initPublication(publications.find((publication) => publication.id === Number(evt.target.closest('.picture').dataset.id)));
      }
    }
  };
}

export { renderThumbnails, initThumbnails };
