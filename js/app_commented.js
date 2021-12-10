//get the url for the movieinformation
const filmUrl = "https://swapi.dev/api/films/";
//get the card container
const cardContainer = document.querySelector("#card-container");
//get the modal
const modal = document.querySelector("#modal-wrapper");
//get the titel area
const movieTitle = document.querySelector("#movie-title");
//get the modal body area
const modalBody = document.querySelector("#modal-body");
//create an empty array for the film info response
let allFilmsInfo = [];


//FUNCTION for filling the movie cards with information
const getFilms = async () => {
    //creates a variable which should contain our response
    const res = await fetch(filmUrl);
    //await = don´t go to the next line of code before the previous one is completed
    //creates a variable that takes the responsse and formats it to js
    const data = await res.json();
    //puts the data in our array
    allFilmsInfo = data.results;
    //render out our array in the html
    cardContainer.innerHTML = allFilmsInfo
      //map up the films of the array
      .map(
        (film) =>
        //renders the titel and release date + the onclick for the card //(the films id as an argument for the openMovieModalfunction)
        `<div class="card"><p class="card-name">${film.title}</p><p class="card-year">Released: ${film.release_date}<br>(click on the card for character list)</p></div>`
      )
      //make the array as a string without the ,
      .join("");
    //call function openMovieModal
    openMovieModal();
};


//FUNCTION for filling the movie modal with information
const getFilmInfo = async (index) => {
  //creates an empty array
  let charactersArray = [];
  //loop over the [index] position of the array as many times as there are characters
  for (let i = 0; i < allFilmsInfo[index].characters.length; i++) {
    //the characterUrl gets the index of the arrayindex[index] and character[index]
    characterUrl = allFilmsInfo[index].characters[i];
    //creates a variable which should contain our response
    const res =  await fetch(characterUrl);
    //creates a variable that takes the responsse and formats it to js
    const data = await res.json();
    //push the data.name into our array
    charactersArray.push(data.name);
  };
  //sort the character array 
  charactersArray.sort();
  //render the titel and the characters in alphabetical order
  movieTitle.innerHTML = `${allFilmsInfo[index].title}`;
  //render out our array in the html
  modalBody.innerHTML = charactersArray
    //map up the characters of the array
    .map ((character) => `<div>${character}</div>`)
    //make the array as a string without the ,
    .join("");  
};


//FUNCTION for opening the movie modal
const openMovieModal = () => {
  //get cards, every card with the classname are collected in an array
  const cards = document.querySelectorAll(".card");
  //iterate over every index in the card array
  for (let i = 0; i < cards.length; i++) {
    //listen for clicks on the cards
    cards[i].addEventListener("click", () => {
      //when clicking, the modal shows up
      modal.style.display = "flex";
      //the spinner shows up during the timing function
      //and after 1000ms the "getFilm" function starts with the clicked index position as an parameter
      setTimeout( () => {
        getFilmInfo([i]);
      }, 1000); 
    });
  };
};


//function for closing the modal, trigged by an onclick in html
const closeMovieModal = () => {
    //hides the modal
    modal.style.display = "none";
    //and clear the title
    movieTitle.innerHTML = "";
    //put back the spinner in html
    modalBody.innerHTML = '<button class="modal-loader"><i class="fa fa-spinner fa-spin"></i></button>';
};

//when the window loads
window.addEventListener("load", () => {
    //the spinner shows up during the timing function
    //and after 500ms the "getFilm" function starts
    setTimeout( () => {
      getFilms();
    }, 500); 
});
