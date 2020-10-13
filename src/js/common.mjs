document.addEventListener('DOMContentLoaded', ready);

/**
 * DOM ready event
 */
function ready() {
  // Click event for mobile-menu
  selectElement('.mobile-menu').addEventListener('click', () => {
    selectElement('header').classList.toggle('active');
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
  const autoplayDelay = 5000;
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
}

/**
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */

const selectElement = (element) => document.querySelector(element);
