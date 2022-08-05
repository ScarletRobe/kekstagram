import { initThumbnails } from './render-thumbnails.js';

import { addFileInputChangeHandler } from './new-publication/new-publication-form.js';

import { showFailMessage } from './get-data-error.js';

import { getData } from './web-api/ajax-requests.js';

import { initFilters } from './publications-filter.js';

// main section

getData(
  (publications) => {
    initThumbnails(publications);
    initFilters(publications);
  },
  showFailMessage
);

addFileInputChangeHandler();

import './big-picture-mode/new-comment.js';
