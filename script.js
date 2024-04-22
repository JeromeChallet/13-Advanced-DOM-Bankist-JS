'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn = btn.addEventListener('click', openModal)));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////SELECTING CREATING AND DELETING ELEMENTS/////////////////////
// selecting elements
//selecting the document element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header');
//select multiple elements
document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
//all the elements with name of buutton
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
// .insertAdjacentHTML

//add a cookie message at the bottom of the screen
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionalities';
message.innerHTML =
  'We use cookies for improved functionalities. <button class="btn btn--close-cookie">Got it!</button>';

// one element can only be at one place at a time so it can be both at the begining and end
// prepdending add as the 1st child of the element
//header.prepend(message);
//appending add as the last child of the element
header.append(message);
//insert multiple copies of the same element by cloning
//header.append(message.cloneNode(true));

//header.before(message);
//header.after(message);

// delete elements
// moving up and down the DOM tree is called DOM traversing
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message);
  });
