const filmUrl = "https://swapi.dev/api/films/";
const cardContainer = document.querySelector("#card-container");
const modal = document.querySelector("#modal-wrapper");
const movieTitle = document.querySelector("#movie-title");
const modalBody = document.querySelector("#modal-body");
let allFilmsInfo = [];

//FUNCTION for filling the movie cards with information
const getFilms = async () => {
    const res = await fetch(filmUrl);
    const data = await res.json();
    allFilmsInfo = data.results;
    cardContainer.innerHTML = allFilmsInfo
      .map((film) =>`<div class="card"><p class="card-name">${film.title}</p><p class="card-year">Released: ${film.release_date}<br>(click on the card for character list)</p></div>`)
      .join("");
    openMovieModal();
};

//FUNCTION for filling the movie modal with information
const getFilmInfo = async (index) => {   
  let charactersArray = [];   
  for (let i = 0; i < allFilmsInfo[index].characters.length; i++) {   
    characterUrl = allFilmsInfo[index].characters[i];     
    const res =  await fetch(characterUrl);    
    const data = await res.json();
    charactersArray.push(data.name);
  };
  charactersArray.sort();
  movieTitle.innerHTML = `${allFilmsInfo[index].title}`;
  modalBody.innerHTML = charactersArray
    .map ((character) => `<div>${character}</div>`)
    .join("");  
};

//FUNCTION for opening the movie modal
const openMovieModal = () => {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      modal.style.display = "flex";
      setTimeout( () => {
        getFilmInfo([i]);
      }, 1000); 
    });
  };
};

//FUNCTION for closing the modal, trigged by an onclick in html
const closeMovieModal = () => {
    modal.style.display = "none";  
    movieTitle.innerHTML = "";
    modalBody.innerHTML = '<button class="modal-loader"><i class="fa fa-spinner fa-spin"></i></button>';
};

window.addEventListener("load", () => {
    setTimeout( () => {
      getFilms();
    }, 500); 
});
