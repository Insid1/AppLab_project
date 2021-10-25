'use strict'

const objNodes = {
    burgerButton: document.querySelector('.burger-button'),
    burgerMenu: document.querySelector('.header__navbar'),

    headerButtons: document.body.querySelectorAll('a[data-goto]'),

    answersList: document.querySelectorAll('.asked-questions__answer'),
    questionList: document.querySelectorAll('.asked-questions__question'),
    answerButton: document.querySelectorAll('.asked-questions__button'),

}



// -------- START code to make interactive banner --------

// Banner nodeElements to work with
const movingBanner = document.querySelector('.banner');
const innerContainer = movingBanner.querySelector('.banner__inner-container');
const innerElements = innerContainer.querySelectorAll('li');

// buttons
const buttonScrollLeft = movingBanner.querySelector('.banner-scrolling-buttons__left');
const buttonScrollRight = movingBanner.querySelector('.banner-scrolling-buttons__right');

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

buttonScrollLeft.addEventListener('click', bannerScrollLeft);
buttonScrollRight.addEventListener('click', bannerScrollRight);

// -------- END code to make interactive banner --------



// -------- START code to animate tariff switching and button --------

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

// -------- END code to animate tariff switching and button --------

function showBurgerMenu() {
    objNodes.burgerButton.classList.toggle('active');
    objNodes.burgerMenu.classList.toggle('active');
    document.body.classList.toggle('active');
}

function makeHeaderButtonsScrollable() {
    for (let aButton of objNodes.headerButtons) {

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
            objNodes.burgerButton.classList.remove('active');
            objNodes.burgerMenu.classList.remove('active');
            document.body.classList.remove('active');
        })
    }
}

function accordeon() {
    for (let i = 0; i < objNodes.answerButton.length; i++) {

        objNodes.questionList[i].addEventListener('click', function () {
            objNodes.answersList[i].classList.toggle('_active');
            objNodes.answerButton[i].classList.toggle('_active');
        })
    }
}


// Scripts to run to activate

objNodes.burgerButton.addEventListener('click', showBurgerMenu) // burger button on slick start
toggleButton.addEventListener('click', switchClassinToggle)

makeHeaderButtonsScrollable() // start script of scrolaable buttons
accordeon() // start accordeon for faq questions

