'use strict';

// empty arrays

let showsList  = [];
let favoritesList = [];

// call Api
const inputElement = document.querySelector('.js-input');

function callToApi() {
const inputValue = inputElement.value;
fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`) 
.then(response => response.json())
.then(data => {
    showsList = [];
    for (let index = 0; index < data.length; index++) {
        showsList.push(data[index].show); 
    } 
    paintShowsList();
});
}

// click search 

const searchElement = document.querySelector('.js-search');

function handleSearch(e) {
    e.preventDefault();   
    callToApi();
    paintShowsList();
 }
 searchElement.addEventListener('click', handleSearch)

// paint shows

 const containerElement = document.querySelector('.js-container--list');

 function paintShowsList(){  
     let htmlCode = '';
     htmlCode += '<h2 class="title-fav">Resultados de búsqueda</h2>';
     htmlCode += '<ul class="list js-list">';
     for (const show of showsList) {
         htmlCode += `<li class="show js-show" id="${show.id}">`;
         htmlCode += `<h3 class="show-name js-show-name">${show.name}</h3>`;
         let showImage = show.image;
         if (showImage === null){
        htmlCode += `<img class="image" src="https://via.placeholder.com/210x295/ffffff/666666/? text=TV" alt="${show.name}">`;
         } 
         else {
         htmlCode += `<img class="image" src="${show.image.medium}" alt="${show.name}">`;
         }
         htmlCode += '</li>';  

     }
    htmlCode += '</ul>';
    containerElement.innerHTML = htmlCode;
    listenShowEvents();
    };

// listen Shows events  

function listenShowEvents(){
    const showElements = document.querySelectorAll('.js-show');
    for (const showElement of showElements) {
       showElement.addEventListener('click', handleShowFavorite);
    }
}

// add favorites to array

function handleShowFavorite(ev){
    const favoriteSelectIndex = favoritesList.findIndex(favorite => (favorite.id === parseInt(ev.currentTarget.id)));
    if (favoriteSelectIndex === -1){
        const showSelect = showsList.find(show => (show.id === parseInt(ev.currentTarget.id)));
        favoritesList.push(showSelect);
    }
    else {
        favoritesList.splice(favoriteSelectIndex,1);
       
    }
    paintFavoritesList();
    setInLocalStorage();
  }

// local Storage

function setInLocalStorage(){
    const stringFavorites = JSON.stringify(favoritesList); 
    localStorage.setItem('favorites', stringFavorites); 
}
function getFromLocalStorage(){
    const localStorageFavorites = localStorage.getItem('favorites');
    if (localStorageFavorites !== null) {
        const arrayFavorites = JSON.parse(localStorageFavorites);
        favoritesList = arrayFavorites;
        console.log(favoritesList);
    }
    paintFavoritesList();
}


// paint favorite list

const containerFavoriteElement = document.querySelector('.js-container--fav');

function paintFavoritesList(){  
    let htmlCode = '';
    htmlCode += '<ul class="list list-fav js-list">';
      for (const favorite of favoritesList) {
          htmlCode += `<li class="show-fav show js-show js-show--favorite" id="${favorite.id}" style="background-color: #d40f48">`;
          htmlCode += `<h3 class="show-name show-name-fav js-show-name">${favorite.name}</h3>`;
          let favoriteImage = favorite.image;
          if (favoriteImage === null){
            htmlCode += `<img class="image image-fav" src="https://via.placeholder.com/210x295/ffffff/666666/? text=TV" alt="${favorite.name}">`;
          } 
          else {
            htmlCode += `<img class="image image-fav" src="${favorite.image.medium}" alt="${favorite.name}">`;
            }
        htmlCode += `<div class="js-remove-fav" style="background-color: #808080" id="${favorite.id}">x</div>`;
        htmlCode += '</li>';  
      }
    htmlCode += '</ul>';
    containerFavoriteElement.innerHTML = htmlCode;
     };

// remove favorite from list

const removeFavorite = document.querySelector('.js-remove-fav');

function handleRemoveFavorite(ev){
    const favoriteSelectIndex = favoritesList.findIndex(favorite => (favorite.id === parseInt(ev.currentTarget.id)));
    if (favoriteSelectIndex === favorite.id){
        favoritesList.splice(favoriteSelectIndex,1);   
    }
    paintFavoritesList();
    setInLocalStorage();
}
removeFavorite.addEventListener('click', handleRemoveFavorite);


     getFromLocalStorage();


