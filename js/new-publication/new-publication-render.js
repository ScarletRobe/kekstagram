import { renderThumbnails } from '../render-thumbnails.js';

const effects = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
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
  newPhoto.style.filter = `${effects[effectName]}(${effectLevel})`;
  newPhoto.style.transform = `scale(${scale})`;

  return {
    'filter': `${effects[effectName]}(${effectLevel})`,
    'transform': `scale(${scale})`
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
  publication.effects = applyEffects(formData, publications.length - 1);
};

const initNewPublicationForm = (data) => {
  publications = data;
};

export {
  initNewPublicationForm,
  createNewPublication
};
