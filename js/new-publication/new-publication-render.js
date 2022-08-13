import { renderThumbnails } from '../render-thumbnails.js';
import { resetFilter } from '../publications-filter.js';

const effects = {
  chrome: {
    effect: 'grayscale',
    unit: ''
  },
  sepia: {
    effect: 'sepia',
    unit: ''
  },
  marvin: {
    effect: 'invert',
    unit: '%'
  },
  phobos: {
    effect: 'blur',
    unit: 'px'
  },
  heat: {
    effect: 'brightness',
    unit: ''
  }
};

const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const fileInputElement = document.querySelector('#upload-file');

let publications;

const applyEffects = (formData, id) => {
  const scale = formData.get('scale');
  const effectName = formData.get('effect');
  const effectLevel = formData.get('effect-chrome') || formData.get('effect-sepia') || formData.get('effect-marvin') || formData.get('effect-phobos') || formData.get('effect-heat');
  const newPhoto = document.querySelector(`.picture[data-id="${id}"] img`);
  newPhoto.style.filter = `${effects[effectName].effect}(${effectLevel}${effects[effectName].unit})`;
  newPhoto.style.transform = `scale(${scale}%)`;

  return {
    'filter': `${effects[effectName].effect}(${effectLevel}${effects[effectName].unit})`,
    'transform': `scale(${scale}%)`
  };
};

const createNewPublication = (formData) => {
  const publication = {
    comments: [],
    description: `${descriptionInputElement.value} ${hashtagsInputElement.value}`,
    id: publications.length,
    likes: 0,
    url: URL.createObjectURL(fileInputElement.files[0]),
  };
  publications.push(publication);
  renderThumbnails(publications);
  resetFilter();
  publication.effects = applyEffects(formData, publications.length - 1);
};

const initNewPublicationForm = (data) => {
  publications = data;
};

export {
  initNewPublicationForm,
  createNewPublication
};
