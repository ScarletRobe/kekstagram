const likesCounterElement = document.querySelector('.likes-count');

const ACTIVE_CLASS = 'likes-count--active';

/**
 * Добавляет визуал при нажатии на лайк. Актуализирует кол-во лайков.
 * @param {object} publication - публикация
 */
const toggleLike = (publication) => {
  if (likesCounterElement.classList.contains(ACTIVE_CLASS))
  {
    --likesCounterElement.textContent;
    publication.isLiked = false;
    --publication.likes;
    --document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).textContent;
  } else {
    ++likesCounterElement.textContent;
    publication.isLiked = true;
    ++publication.likes;
    ++document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).textContent;
  }

  likesCounterElement.classList.toggle(ACTIVE_CLASS);
};

export { toggleLike };
