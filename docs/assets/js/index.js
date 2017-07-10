'use strict';

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

var init = function init() {
  if (window.matchMedia('(min-width: 1024px)').matches) {} else {
    mobile();
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
      if (fromTop < w / 2) {
        heroText.style.fontSize = 2 - fromTop / 130 + 'em';
        hero.classList.remove('hero-fixed');
        heroNav.classList.remove('hero-nav-fixed');
        heroText.classList.remove('h1-fixed');
        heroImg.classList.remove('hero-img-fixed');
        // heroText.style.transform = `scale(${1-fromTop/200})`
      } else {
        hero.classList.add('hero-fixed');
        heroNav.classList.add('hero-nav-fixed');
        heroText.classList.add('h1-fixed');
        heroImg.classList.add('hero-img-fixed');
      }
      if (fromTop > 360) {
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
};