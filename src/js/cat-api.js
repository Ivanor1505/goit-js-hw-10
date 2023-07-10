import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_90gRrriou8scEThB9jSNLNR8EPZTVg784AOwksCcwT2K28QwfCQxgj5GP08NaRH4";

function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
      .then(response => response.data
  )
    .catch(error => {
      throw new Error("Failed to fetch breeds");
    });
    
}
// console.log(fetchBreeds())

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data[0])
    .catch(error => {
      throw new Error("Failed to fetch cat information");
    });
}


export {fetchBreeds, fetchCatByBreed}