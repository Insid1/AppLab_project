'use strict'


// -------- START code to animated tariff switch and button --------

// Nodes кнопки
const toggleButton = document.querySelector('.toggle-button');
const toggleLighter = toggleButton.querySelector('.toggle-button__lighter')
const toggleButtonSpans = toggleButton.querySelectorAll('span');
// Nodes тарифов
const monthPlane = document.querySelector('div.price-list.month');
const yearPlane = document.querySelector('.price-list.year');

// Смена css классов по toggle
function switchClassinToggle() {
    toggleLighter.classList.toggle('moved');
    toggleButtonSpans[0].classList.toggle('selected');
    toggleButtonSpans[1].classList.toggle('selected');
    monthPlane.classList.toggle('active');
    yearPlane.classList.toggle('active');
}

toggleButton.addEventListener('click', switchClassinToggle)

// -------- START code to animated tariff switch and button --------


// -------- START code to make interactive banner --------

// Banner nodeElements to work with
const movingBanner = document.querySelector('.banner');
const innerContainer = movingBanner.querySelector('.banner__inner-container');
const innerElements = innerContainer.querySelectorAll('li');

// Width of content inside banner
let totalInnerWidth = 0;
innerElements.forEach(value => {
    totalInnerWidth += value.offsetWidth;
})

// Coord to move in the banner
let translateXCoord = 0;

let increment = 270;

function bannerScrollRight() {
    translateXCoord += - increment;
    if (translateXCoord < -totalInnerWidth + innerElements[0].offsetWidth) translateXCoord = -totalInnerWidth + innerElements[0].offsetWidth;

    innerContainer.style.transform = `translateX(${translateXCoord}px)`;
}

function bannerScrollLeft() {
    translateXCoord += increment;
    if (translateXCoord > 0) translateXCoord = 0;

    innerContainer.style.transform = `translateX(${translateXCoord}px)`;
}

// buttons
const buttonScrollLeft = movingBanner.querySelector('.banner-scrolling-buttons__left');
const buttonScrollRight = movingBanner.querySelector('.banner-scrolling-buttons__right');

buttonScrollLeft.addEventListener('click', bannerScrollLeft);
buttonScrollRight.addEventListener('click', bannerScrollRight);

// -------- END code to make interactive banner --------

// -------- START code to make Animated floating list --------

const answersList = document.querySelectorAll('.asked-questions__answer');
const questionList = document.querySelectorAll('.asked-questions__question');
const answerButton = document.querySelectorAll('.asked-questions__button');

for (let i = 0; i < answerButton.length; i++) {

    questionList[i].addEventListener('click', function () {
        answersList[i].classList.toggle('_active');
        answerButton[i].classList.toggle('_active');
    })

}

// -------- END code to make Animated floating list --------


// -------- START code to scroll menu Buttons --------

// сначало получить кнопки для скролинга
// потом получить  координаты блоков с классом указанным в кнопках скроллинга в атрибусе data-goto

const headerButtons = document.body.querySelectorAll('a[data-goto]')



for (let aButton of headerButtons) {

    aButton.addEventListener('click', function () {
        let currClassName = aButton.dataset.goto;
        const currScrollToDiv = document.body.querySelector('.' + currClassName);
        let currYCord = currScrollToDiv.offsetTop;
        scrollTo({
            left: 0,
            top: (currYCord - document.querySelector('header').offsetHeight),
            behavior: "smooth",
        })

        // to close burger menu if clicked
        burgerButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        document.body.classList.remove('active');
    })
}


// -------- END code to scroll menu Buttons --------

// -------- START burgerMenu --------
const burgerButton = document.querySelector('.burger-button');
const burgerMenu = document.querySelector('.header__navbar');

burgerButton.addEventListener('click', showBurgerMenu)

function showBurgerMenu() {
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('active');
}
// -------- END burgerMenu --------

