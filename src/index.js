import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function createMarkup(catData) {
  catInfo.innerHTML = `
    <h2>${catData.name}</h2>
    <img class="cat-image" src="${catData.url}" alt="Cat Image">
    <p>${catData.description}</p>
    <p>Temperament: ${catData.temperament}</p>
  `;
}

function showError() {
  error.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

fetchBreeds()
  .then((breeds) => {
    const options = breeds.map((breed) => ({
      value: breed.id,
      text: breed.name,
    }));

    new SlimSelect({
      select: breedSelect,
      placeholder: 'Select a breed',
      allowDeselect: true,
      onChange: (info) => {
        const breedId = info.value();
        if (breedId) {
          showLoader();
          hideError();
          fetchCatByBreed(breedId)
            .then((catData) => {
              createMarkup(catData);
              hideLoader();
              catInfo.style.display = 'block';
            })
            .catch((error) => {
              console.error(error);
              hideLoader();
              showError();
              catInfo.style.display = 'none';
            });
        } else {
          catInfo.style.display = 'none';
        }
      },
      data: options,
    });
  })
