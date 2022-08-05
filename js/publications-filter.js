import { renderThumbnails } from './render-thumbnails.js';

import {
  getUniqueRandomPositiveInteger,
  debounce,
} from './utils.js';

const RANDOM_POSTS_AMOUNT = 10;
const RERENDER_DELAY = 500;

const FilterNames = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISSCUSED: 'filter-discussed',
};

// Элементы DOM

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = filtersContainerElement.querySelector('.img-filters__form');
const filterBtnsElements = filtersFormElement.querySelectorAll('.img-filters__button');

// Логика фильтрации

/**
 * Отображает все публикации
 * @param {array} publications - массив публикаций
 */
const showAllPosts = (publications) => {
  renderThumbnails(publications);
};

/**
 * Отображает случайные публикации
 * @param {array} publications - массив публикаций
 */
const showRandomPosts = (publications) => {
  const getIndex = getUniqueRandomPositiveInteger(0, publications.length -1);
  const randomPublications = [];

  for (let i = 0; i < RANDOM_POSTS_AMOUNT; i++) {
    randomPublications.push(publications[getIndex()]);
  }

  renderThumbnails(randomPublications);
};

/**
 * Сортирует массив публикаций по количеству комментариев
 * @param {publications} publications - массив публикаций
 * @returns - функция, отображающая отсортированные публикации
 */
const showMostDiscussedPosts = (publications) => {
  const sortedPublications = publications.slice().sort((a, b) => b.comments.length - a.comments.length);

  renderThumbnails(sortedPublications);
};

//

/**
 * Вызывает соответствующую функцию фильтрации
 * @param {array} publications - массив публикаций
 * @param {object} evt - event
 */
const changeFilter = (publications, evt) => {
  switch (evt.target.id) {
    case FilterNames.DEFAULT:
      showAllPosts(publications);
      break;
    case FilterNames.RANDOM:
      showRandomPosts(publications);
      break;
    case FilterNames.DISSCUSED:
      showMostDiscussedPosts(publications);
      break;
  }
};

/**
 * Подключает фильтрацию публикаций
 * @param {array} publications - массив публикаций
 */
const initFilters = (publications) => {
  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', addfiltersFormClickHandler(publications));
};

// Обработчики

/**
 *
 * @param {array} publications - массив публикаций
 * @returns функция-обработчик нажатия на область выбора фильтра
 */
function addfiltersFormClickHandler(publications) {
  const debouncedChangeFilter = debounce(changeFilter, RERENDER_DELAY, true);
  return (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      evt.preventDefault();
      debouncedChangeFilter(publications, evt);

      filterBtnsElements.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
    }
  };
}

export { initFilters };
