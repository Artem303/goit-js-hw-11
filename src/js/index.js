import { PixabayAPI } from './PixabayAPI';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import { createCurdsMarcup } from './functions';

const apiGallery = new PixabayAPI();

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', handlerSearch);
loadMoreBtn.addEventListener('click', onloadMore);

loadMoreBtn.classList.add('is-hidden');

function handlerSearch(e) {
  e.preventDefault();

  apiGallery.query = e.currentTarget.elements[0].value.trim();
  apiGallery.resetPage();
  galleryEl.innerHTML = '';
  if (e.currentTarget.elements[0].value.trim() === '') {
    return Notiflix.Notify.warning('Empty input field!!!');
  }

  apiGallery
    .getImages()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        return Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      createCurdsMarcup(galleryEl, hits);
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      loadMoreBtn.classList.remove('is-hidden');
      gallery.refresh();
    })
    .catch(e => {
      console.warn(e);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function onloadMore() {
  apiGallery.getImages().then(({ hits, totalHits }) => {
    if (totalHits / 40 < apiGallery.page - 1) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    createCurdsMarcup(galleryEl, hits);
    gallery.refresh();
  });
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});
