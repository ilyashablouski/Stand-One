/* eslint-disable object-curly-spacing */
import { CountUp } from '../lib/lib.min.js';

/**
 * Choose element function
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */

const selectElement = (element) => document.querySelector(element);

document.addEventListener('DOMContentLoaded', () => {
  // Close active overlays
  const headerElement = selectElement('.header');
  const dropElements = document.querySelectorAll('.__select');
  document.body.addEventListener('mouseup', (event) => {
    // if not header
    if (!event.target.closest('.header')) {
      headerElement.classList.remove('active');
    }

    // if not select
    if (!event.target.closest('.__select__content')) {
      for (const dropElement of dropElements) {
        dropElement.setAttribute('data-state', '');
      }
    }
  });

  // Click event for mobile-menu
  selectElement('.mobile-menu').addEventListener('click', () => {
    selectElement('.header').classList.toggle('active');
  });

  // Play video
  const overlay = document.getElementById('overlay');
  const video = selectElement('.video');

  if (overlay.addEventListener) {
    overlay.addEventListener('click', playPause, false);
  } else if (overlay.attachEvent) {
    overlay.attachEvent('onclick', playPause);
  }

  /**
 *
 * Play/pause for HTML5 video
 */
  function playPause() {
    if (video.paused) {
      video.play();
      overlay.className = 'is-play';
    } else {
      video.pause();
      overlay.className = '';
    }
  }


  /**
   * Glider.js
   *
   * @see  {@link https://nickpiscitelli.github.io/Glider.js/}
   */


  // Initialization
  const slider = new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    scrollLock: true,
    rewind: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next',
    },
  });

  // Set autoplay
  const autoplayDelay = 10000;
  const element = document.querySelector('.glider');

  let autoplay = setInterval(() => {
    slider.scrollItem('next');
  }, autoplayDelay);

  element.addEventListener('mouseover', (event) => {
    if (autoplay != null) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }, 300);

  element.addEventListener('mouseout', (event) => {
    if (autoplay == null) {
      autoplay = setInterval(() => {
        slider.scrollItem('next');
      }, autoplayDelay);
    }
  }, 300);


  /**
   *
   * Select 1
   */
  const selectSingleDelivery = document.querySelector('.__select-delivery');
  const selectSingleTitleDelivery =
    selectSingleDelivery.querySelector('.__select__title-delivery');
  const selectSingleLabelsDelivery =
    selectSingleDelivery.querySelectorAll('.__select__label-delivery');

  // Toggle menu
  selectSingleTitleDelivery.addEventListener('click', () => {
    if ('active' === selectSingleDelivery.getAttribute('data-state')) {
      selectSingleDelivery.setAttribute('data-state', '');
    } else {
      selectSingleDelivery.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingleLabelsDelivery.length; i++) {
    selectSingleLabelsDelivery[i].addEventListener('click', (evt) => {
      selectSingleTitleDelivery.textContent = evt.target.textContent;
      selectSingleDelivery.setAttribute('data-state', '');
    });
  }

  /**
   *
   * Select 2
   */
  const selectSinglePay = document.querySelector('.__select-pay');
  const selectSingleTitlePay =
    selectSinglePay.querySelector('.__select__title-pay');
  const selectSingleLabelsPay =
    selectSinglePay.querySelectorAll('.__select__label-pay');

  // Toggle menu
  selectSingleTitlePay.addEventListener('click', () => {
    if ('active' === selectSinglePay.getAttribute('data-state')) {
      selectSinglePay.setAttribute('data-state', '');
    } else {
      selectSinglePay.setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let i = 0; i < selectSingleLabelsPay.length; i++) {
    selectSingleLabelsPay[i].addEventListener('click', (evt) => {
      selectSingleTitlePay.textContent = evt.target.textContent;
      selectSinglePay.setAttribute('data-state', '');
    });
  }


  /**
   *
   * Counter
   */

  const plusButton = selectElement('.plus');
  const minusButton = selectElement('.minus');
  const inputField = selectElement('.counter__input');
  let inputFieldValue = inputField.value;
  const priceValueElement = selectElement('.price__value');

  plusButton.addEventListener('click', () => {
    if (inputFieldValue < 100) {
      inputFieldValue++;
      inputField.value = inputFieldValue;
      countTotalPrice(inputField.value);
    }
  });

  minusButton.addEventListener('click', () => {
    if (inputFieldValue > 1) {
      inputFieldValue--;
      inputField.value = inputFieldValue;
      countTotalPrice(inputField.value);
    }
  });

  inputField.addEventListener('focusout', () => {
    const inputFieldFocusValue = inputField.value;

    inputFieldValue = inputFieldFocusValue;

    if (inputFieldFocusValue > 100) {
      inputField.value = 100;
      inputFieldValue = 100;
      countTotalPrice(inputFieldValue);
    } else {
      countTotalPrice(inputFieldValue);
    }
  });

  /**
     *  Count total price
     *
     * @param {number} quantity
     */
  const countTotalPrice = (quantity) => {
    const total = quantity * 40;
    priceValueElement.innerHTML = total;
  };


  // Intersection Observer API
  const elements = document.querySelectorAll('[data-observable]');
  const callbackCounter = () => {
    // Counter call
    countUpInit();
  };

  const callbackShow = (target) => {
    // Add animate for opacity call
    animateShow(target);
  };
  const observer = new IntersectionObserver(handleIntersection);

  elements.forEach((obs) => {
    observer.observe(obs);
  });

  /**
   * Custom handler for Intersection Observer API
   *
   * @param {object} entries
   * @param {object} observer
   */
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        // if counter block
        if (entry.target.classList.contains('feature-block__inner')) {
          callbackCounter();
          observer.unobserve(entry.target);
          // if steps block
        } else if (entry.target.classList.contains('steps-item')) {
          callbackShow(entry.target);
          observer.unobserve(entry.target);
        }
      }
    });
  }
});


// Define functions

/**
* countUp.js
* @see  {@link https://github.com/inorganik/CountUp.js}
*/
/**
 * countUpInit plugin call
 */
function countUpInit() {
  const options = {
    duration: 4,
    useEasing: true,
  };
  const numCounter1 = new CountUp('numCounter1', 12, options);
  numCounter1.start();

  const numCounter2 = new CountUp('numCounter2', 16, options);
  numCounter2.start();

  const numCounter3 = new CountUp('numCounter3', 250, options);
  numCounter3.start();
}

/**
 * Animate opacity
 * @param {HTMLElement} target
 */
function animateShow(target) {
  target.classList.add('is-show');
}

