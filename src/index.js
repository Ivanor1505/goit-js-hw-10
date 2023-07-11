// 1. Імпорти, елементи HTML
// 2. Додати масив порід в інпут
// 3. Відстежити обрану породу, дістати необхідні дані (фото, опис породи)
// 4. Додати відображення даних на сторінку

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

 
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    new SlimSelect('.breed-select', {
      placeholder: 'Оберіть породу'
    });

    breedSelect.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(() => {
    Notify.failure(`An error occurred while fetching data.`);
    loader.style.display = 'none';
  });

breedSelect.addEventListener('change', onChange);
  
  
function onChange() {
    const selectedBreedId = breedSelect.value;

    loader.style.display = 'block';

    // console.log(fetchCatByBreed(selectedBreedId));
    fetchCatByBreed(selectedBreedId)
        .then(cat => {
        const { name, description, temperament } = cat.breeds[0];
    
        catInfo.innerHTML = `
  
  <img class="cat-image" src="${cat.url}" alt="Cat Image">
  <div><h2 class="cat-name">${name}</h2>
  <p class="cat-description">${description}</p>
  <p class="cat-temperament">${temperament}</p>
  </div>`;
        loader.style.display = 'none';
        })
    .catch(() => {
        Notify.failure(`An error occurred while fetching data.`);
        loader.style.display = 'none';
    });
};
