'use strict'

// Objective approach. All linked elements are placen into relatevely names objects;

const objScrollingBanner = {
    //Initial banner element (sometime calls carousel)
    movingBanner: document.querySelector('.banner'),

    // Width of content inside banner
    totalInnerWidth: 0,

    // Coord to move in the banner
    translateXCoord: 0,
    increment: 270,

    getTotalInnerWidth() {
        this.innerContainer = this.movingBanner.querySelector('.banner__inner-container');
        this.innerElements = this.innerContainer.querySelectorAll('li');

        this.innerElements.forEach(value => {
            this.totalInnerWidth += value.offsetWidth;
        })
    },

    // must be called after method getTotalInnerWidth() (cuz getTotalInnerWidth assigns new properties for this object)
    bannerScrollLeft() {
        this.translateXCoord += this.increment;
        if (this.translateXCoord > 0) this.translateXCoord = 0;

        this.innerContainer.style.transform = `translateX(${this.translateXCoord}px)`;
    },
    bannerScrollRight() {
        this.translateXCoord += - this.increment;
        if (this.translateXCoord < -this.totalInnerWidth + this.innerElements[0].offsetWidth) {
            this.translateXCoord = -this.totalInnerWidth + this.innerElements[0].offsetWidth;
        }

        this.innerContainer.style.transform = `translateX(${this.translateXCoord}px)`;
    },

    activate() {
        // buttons
        this.buttonScrollLeft = this.movingBanner.querySelector('.banner-scrolling-buttons__left');
        this.buttonScrollRight = this.movingBanner.querySelector('.banner-scrolling-buttons__right');

        //initialize calculation and assignment axtra properties to this obj
        this.getTotalInnerWidth()

        this.buttonScrollLeft.addEventListener('click', () => {
            this.bannerScrollLeft();
        });
        this.buttonScrollRight.addEventListener('click', () => {
            this.bannerScrollRight();
        });
    }
}

const objAnimatedTarif = {
    toggleButton: document.querySelector('.toggle-button'),
    monthPlan: document.querySelector('div.price-list.month'),
    yearPlan: document.querySelector('.price-list.year'),

    // Method to switch CSS classes with toggle
    switchClassinToggle() {
        const toggleLighter = this.toggleButton.querySelector('.toggle-button__lighter')
        const toggleButtonSpans = this.toggleButton.querySelectorAll('span');

        toggleLighter.classList.toggle('moved');
        toggleButtonSpans[0].classList.toggle('selected');
        toggleButtonSpans[1].classList.toggle('selected');
        this.monthPlan.classList.toggle('active');
        this.yearPlan.classList.toggle('active');
    },

    // Activate eventlistener with function SwitchClassinToggle on click
    activate() {
        this.toggleButton.addEventListener('click', () => {
            this.switchClassinToggle();
        })
    }
}

const objMenuBurger = {
    burgerButton: document.querySelector('.burger-button'),
    burgerMenu: document.querySelector('.header__navbar'),

    showBurgerMenu() {
        this.burgerButton.classList.toggle('active');
        this.burgerMenu.classList.toggle('active');
        document.body.classList.toggle('active');
    },

    activate() {
        this.burgerButton.addEventListener('click', () => {
            this.showBurgerMenu();
        })
    }

}

class ScrollableLinks {

    constructor(links) {
        this.links = links; // collection of links with prop like [data-goto];
    }

    makeHeaderButtonsScrollable() {
    for (let aButton of this.links) {

        aButton.addEventListener('click', () => {
            let currClassName = aButton.dataset.goto; // pull out property dataset → [goto] from html
            const currScrollToDiv = document.body.querySelector('.' + currClassName);
            let currYCord = currScrollToDiv.offsetTop;

            scrollTo({
                left: 0,
                top: (currYCord - document.querySelector('header').offsetHeight),
                behavior: "smooth",
            })

            // to close burger menu if clicked
            objMenuBurger.burgerButton.classList.remove('active');
            objMenuBurger.burgerMenu.classList.remove('active');
            document.body.classList.remove('active');
        })
    }
}

activate() {
    this.makeHeaderButtonsScrollable();
}
};

// const objHeaderLinks = {
//     headerLinks: document.body.querySelectorAll('a[data-goto]'), // collection of header links with prop like [data-goto];

//     makeHeaderButtonsScrollable: function () {
//         for (let aButton of this.headerLinks) {

//             aButton.addEventListener('click', () => {
//                 let currClassName = aButton.dataset.goto; // pull out property dataset → goto from html
//                 const currScrollToDiv = document.body.querySelector('.' + currClassName);
//                 let currYCord = currScrollToDiv.offsetTop;

//                 scrollTo({
//                     left: 0,
//                     top: (currYCord - document.querySelector('header').offsetHeight),
//                     behavior: "smooth",
//                 })

//                 // to close burger menu if clicked
//                 objMenuBurger.burgerButton.classList.remove('active');
//                 objMenuBurger.burgerMenu.classList.remove('active');
//                 document.body.classList.remove('active');
//             })
//         }
//     },

//     activate() {
//         this.makeHeaderButtonsScrollable();
//     },
// }

/**
 * Class accordeon takes 3 arguments when innitialized by construction method.
 * 1st - collection(list of nodes) of answers for questions
 * 2nd - collection(list of nodes) of questions
 * 3rd - button to close or open accordeon
 */
class Accordeon {
    constructor(answersList, questionList, closeButton) {
        this.answersList = answersList;
        this.questionList = questionList;
        this.closeButton = closeButton;
    }

    applayForAll() {
        for (let i = 0; i < this.closeButton.length; i++) {

            this.questionList[i].addEventListener('click', () => {
                this.answersList[i].classList.toggle('_active');
                this.closeButton[i].classList.toggle('_active');
            })
        }
    }

    activate() {
        this.applayForAll();
    }
}


// methods to run to activate dynamic
objScrollingBanner.activate();
objAnimatedTarif.activate();
objMenuBurger.activate();

const faqAccordeon = new Accordeon(document.querySelectorAll('.asked-questions__answer'), document.querySelectorAll('.asked-questions__question'), document.querySelectorAll('.asked-questions__button'));
faqAccordeon.activate();

const headerLinksScrollable = new ScrollableLinks(document.body.querySelectorAll('a[data-goto]'));
headerLinksScrollable.activate();
