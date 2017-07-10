'use strict';

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

var init = function init() {
  if (window.matchMedia('(min-width: 1024px)').matches) {} else {
    mobile();
    roomSlider();
  }

  function mobile() {
    var hero = document.querySelector('#hero'),
        heroNav = document.querySelector('nav'),
        heroText = document.querySelector('h1'),
        heroImg = document.querySelector('#hero-img img'),
        hamburger = document.querySelector('#hamburger-menu'),
        intro = document.querySelector('#bemutatkozas'),
        w = window.innerWidth;

    hamburger.addEventListener('click', function () {
      heroNav.classList.toggle('hidden');
    });
    window.onscroll = scrolled;

    function scrolled() {
      var fromTop = window.scrollY;
      if (fromTop < w * 0.9 - 60) {
        heroText.style.fontSize = 2 - fromTop / 160 + 'em';
        hero.classList.remove('hero-fixed');
        heroNav.classList.remove('hero-nav-fixed');
        heroText.classList.remove('h1-fixed');
        heroImg.classList.remove('hero-img-fixed');
      } else {
        hero.classList.add('hero-fixed');
        heroNav.classList.add('hero-nav-fixed');
        heroText.classList.add('h1-fixed');
        heroImg.classList.add('hero-img-fixed');
      }
      if (fromTop > w * 1.35) {
        heroNav.classList.add('nav-mobile', 'hidden');
        intro.classList.add('intro-fixed');
        hamburger.classList.remove('hidden');
      } else {
        hamburger.classList.add('hidden');
        heroNav.classList.remove('nav-mobile', 'hidden');
        intro.classList.remove('intro-fixed');
      }
    }
  }

  function roomSlider() {
    var current = 0,
        slides = document.querySelectorAll('.room-slider img');

    setInterval(function () {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
      }
      current = current != slides.length - 1 ? current + 1 : 0;
      slides[current].style.opacity = 1;
    }, 5000);
  }
};