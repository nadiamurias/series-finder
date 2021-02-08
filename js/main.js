'use strict';

// variables globales

const inputElement = document.querySelector('.js-input');
const searchElement = document.querySelector('.js-search');
const containerElement = document.querySelector('js.container');

let dataResults  = [];

// call Api

function callToApi () {
fetch('http://api.tvmaze.com/search/shows?q=girls')
.then(response => response.json())
.then(data => {
    for (let index = 0; index < data.length; index++) {
        dataResults = data[index].show;
        console.log(dataResults);
        paintShowsList(dataResults);
    }
});
}

callToApi();


function paintShowsList(){  
    let htmlCode = '';
    htmlCode += '<ul class="js-list">';
    for (const show of showsList) {
        htmlCode += '<li class="js-show">';
        htmlCode += `<h2 class="js-show-name">${show.name}</h2>`;
        htmlCode += `<img src="${show.image.medium}" alt="image">`;
        htmlCode += '</li>';  
    }
    htmlCode += '</ul>';
    containerElement.innerHTML = htmlCode;
};