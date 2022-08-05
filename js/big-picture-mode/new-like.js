// Переменные

const ACTIVE_CLASS = 'likes-count--active';

// Элементы DOM

const likesCounterElement = document.querySelector('.likes-count');

//

/**
 * Добавляет визуал при нажатии на лайк. Актуализирует кол-во лайков.
 * @param {object} publication - публикация
 */
const toggleLike = (publication) => {
  const likesElement = document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`);

  if (likesElement.classList.contains(ACTIVE_CLASS)) {
    --likesCounterElement.textContent;
    publication.isLiked = false;
    --publication.likes;
    --document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).textContent;
    document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).classList.remove('picture__likes--active');
    likesCounterElement.classList.remove(ACTIVE_CLASS);

  } else {
    ++likesCounterElement.textContent;
    publication.isLiked = true;
    ++publication.likes;
    ++document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).textContent;
    document.querySelector(`.picture[data-id="${publication.id}"] .picture__likes`).classList.add('picture__likes--active');
    likesCounterElement.classList.add(ACTIVE_CLASS);

  }
  likesElement.classList.toggle(ACTIVE_CLASS);
};

export { toggleLike };
