'use strict';

// variables globales


let showsList  = [];
let favoriteList = [];

// call Api
const inputElement = document.querySelector('.js-input');

function callToApi() {
const inputValue = inputElement.value;
fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`) 
.then(response => response.json())
.then(data => {
    for (let index = 0; index < data.length; index++) {
        showsList.push(data[index].show); 
    }
    paintShowsList();
    console.log(showsList); 
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
         htmlCode += '<li class="show js-show">';
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
 };
  // Add to favorites

  function 
const showElement = document.querySelector('.js-show');

showElement.addEventListener('click', handleShowClick)

