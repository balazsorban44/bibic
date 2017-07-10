'use strict';

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

var init = function init() {
  if (window.matchMedia('(min-width: 1024px)').matches) {} else {
    mobile();
  }
  roomSlider();

  function mobile() {
    var nav = document.querySelector('nav'),
        mobileNav = document.querySelector('.mobile-nav'),
        mobileMenu = document.querySelector('#mobile-menu'),
        heroText = document.querySelector('h1'),
        hamburger = document.querySelector('#hamburger-icon');

    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('mobile-nav-active');
    });

    mobileNav.addEventListener('click', function () {
      mobileNav.classList.remove('mobile-nav-active');
    });

    nav.addEventListener('click', function () {
      navBar();
    });

    window.onscroll = scrolled;
    function scrolled() {
      var fromTop = window.pageYOffset;
      if (fromTop < 120) {
        heroText.className = "";
        mobileMenu.classList.add('hidden');
      } else if (fromTop > 120 && fromTop < 200) {
        heroText.classList.add('hero-text-fixed');
      } else if (fromTop > 200 && fromTop < 480) {
        mobileMenu.classList.remove('hidden');
        hamburger.classList.add('hidden');
      } else if (fromTop > 480) {
        navBar();
      }
    }

    function navBar() {
      heroText.classList.add('hero-text-fixed');
      mobileMenu.classList.remove('hidden');
      mobileNav.classList.remove('mobile-nav-active');
      hamburger.classList.remove('hidden');
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