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

//paint shows

 const containerElement = document.querySelector('.js-container--list');

 function paintShowsList(){  
     let htmlCode = '';
     htmlCode += '<ul class="js-list">';
     for (const show of showsList) {
         htmlCode += `<li class="show js-show" id="${show.id}">`;
         htmlCode += `<h3 class="js-show-name">${show.name}</h3>`;
         let showImage = show.image;
         if (showImage === null){
        htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/? text=TV" alt="${show.name}">`;
         } 
         else {
         htmlCode += `<img src="${show.image.medium}" alt="${show.name}">`;
         }
         htmlCode += '</li>';  

     }
    htmlCode += '</ul>';
    containerElement.innerHTML = htmlCode;
    listenShowEvents();
    };

//listen Shows events  

function listenShowEvents(){
    const showElements = document.querySelectorAll('.js-show');
    for (const showElement of showElements) {
       showElement.addEventListener('click', handleShow);
    }
}


function handleShow(ev){
    const favoriteSelect = favoritesList.find(favorite => (favorite.id === parseInt(ev.currentTarget.id)));
    console.log(favoriteSelect)
    if (favoriteSelect === undefined){
    const showSelect = showsList.find(show => (show.id === parseInt(ev.currentTarget.id)));
    favoritesList.push(showSelect);
    }
    else {
        favoritesList.splice(0,1);
    }

    
    console.log('click en serie',showSelect);
    
    paintFavoritesList();
  }

// Paint favorite list

  const containerFavoriteElement = document.querySelector('.js-container--fav');
  function paintFavoritesList(){  
      let htmlCode = '';
      htmlCode += '<ul class="js-list">';
      for (const favorite of favoritesList) {
          htmlCode += `<li class="show js-show" id="${favorite.id}" style="background-color: #fa8072">`;
        
          htmlCode += `<h3 class="js-show-name">${favorite.name}</h3>`;
          let favoriteImage = favorite.image;
          if (favoriteImage === null){
         htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/? text=TV" alt="${favorite.name}">`;
          } 
          else {
          htmlCode += `<img src="${favorite.image.medium}" alt="${favorite.name}">`;
          }
          htmlCode += '</li>';  
 
      }
     htmlCode += '</ul>';
     containerFavoriteElement.innerHTML = htmlCode;

     };



