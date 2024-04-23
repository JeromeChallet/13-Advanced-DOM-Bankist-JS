'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations_tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const initialCoords = section.getBoundingClientRect();

///////////////////////////////////////
// Modal window

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

//btn scrolling
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

//////////////////INTERSECTION OBSERVER API/////////////////////
// this api observes changes to the way an element intersect with another or with the viewport
// the callback function will be called each time that the observed element is intersecting the root element at the threshold that we defined
// menaing when the section1 is meeting the root at 10%
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   // the root is the element the target is intersecting
//   root: null,
//   // the % of intersection at which the observer callback will be called
//   // 0 will trigger everytime the target element gets out of view or enters teh view
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove;
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // for the entire viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//////////////////REVEALING ELEMENT ON SCROLL/////////////////////
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////EVENT DELEGATION/////////////////////
// page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// with the way above we are attaching the event handler to each element, making copies of the same function
// to fix that we use event delegation
// we put the evetn listener on a common parent of all the elements during the ubble up phase
// we need 2 steps,
//1.add the event listener to a common parent elements
//2.in the event listener, determine what element originated the event
document.querySelector('nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  //matching strategy to make sure the event happense when we select the child element not its parent
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//////////////////STICKY NAVIGATION SCROLL EVENT/////////////////////
// this method is inneficient cause it fires all the time
window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top)
    this.navigator.classList.add('sticky');
  else this.navigator.classList.remove('sticky');
});

//////////////////BUILDING TABBED COMPONENT/////////////////////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations_tab');
  console.log(clicked);

  //if nothing is clicked then finish this function
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove());

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////PASSING ARGUMENTS TO EVENT HANDLER/////////////////////
// menu fade animation
// we can only pass one argument into the handlehover function thus we use this keyword to pass one more
const handleHover = function (e) {
  if (e.currentTarget.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passign an argument into the handle function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

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
/*
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
*/
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

//////////////////EVENT PROPAGATION/////////////////////
// random color
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// addEventListener only listens to element for the bubling phase but not the capturing phase
// to do so during hte capturing pahse, set the 3rd parameter to false
// in all 3 handlers the target element is always the same (nav__link)
// because they handle the same event
// also the currentTarget is the same at the this keyword
// but the currentTarget is not the same
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // nav__link
  //stop event propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // nav__link
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // nav__link
});

//////////////////DOM TRAVERSING/////////////////////
// walking through the DOM or selecting an element based on another element
// very usefull when we need to select an element relative to a certain element
const h1 = document.querySelector('h1');
//select all the elements of h1 with the highlight class
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // gives us all the nodes of h1 even those that not inside h1
console.log(h1.children); // gives us all the nodes of h1 that are inside h1
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';
// going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

// selects the closest element that has the style header
h1.closest('.header').style.background = 'var(--gradient-secondary';
h1.closest('h1').style.background = 'var(--gradient-primary';

//going sideways: sibling
// can only select the previous or next, direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if we need all the siblings, we first must move the parent element then read teh siblings from there
console.log(h1.parentElement.children);
// we create an array of all the siblings
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
