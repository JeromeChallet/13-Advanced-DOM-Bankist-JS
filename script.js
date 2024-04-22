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

//////////////////STYLES ATTRIBUTES CLASSES/////////////////////
//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// if we dont set the style ourselves we cannot see it in the console log
console.log(message.style.height); // empty
console.log(message.style.backgroundColor); //37383d
// all the prop with all the values
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// getComputerStyle(message) is a string so we must convert ot a number first
message.style.height =
  Number.parseFloat(getComputerStyle(message).height, 10) + 40 + 'px';

// reaasign a css property
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// access attributes of an element
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

logo.alt = 'beautifull logo';

// only works on existing standart attributes
console.log(logo.desginer); // undefined
console.log(logo.getAttribute('designer')); // jerome

logo.setAttribute('company', 'Bankist');

//absolute version vs the relative one
console.log(logo.src); // jerome
console.log(logo.getAttribute('src')); // full address

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes
console.log(logo.dataset.versionNumber);

//classes
// allows to add or remove classes without interfering with the existing ones
logo.classList.add('c');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
//this will overide all the existing classes so better not doing it
//logo.className = 'jerome';

//////////////////IMPLEMENTING SMOOTH SCROLLING/////////////////////
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Currrent scroll (X/Y', window.pageXOffset, pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  // we calculate by getting the current position + the current scroll
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // old school method
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////TYPES OF EVENT AND EVENT HANDLERS/////////////////////
// even is a signal(something that has happened) that is generated by a dumb node

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great u r redint eh heading');
// });

const alertH1 = function (e) {
  alert('addEventListener: Great u r redint eh heading');
};

h1.addEventListener('mouseenter', alertH1);

// old wayt to add an event listener
h1.onmouseenter = function (e) {
  alert('addEventListener: Great u r redint eh heading');

  //h1.removeEventListener('mouseenter', alertH1);
};

setTimeout(() => h1.removeEventListener('mouseenter, alerth1'), 3000);
