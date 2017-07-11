'use strict';

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

var init = function init() {
  var nav = document.querySelector('nav'),
      mobileNav = document.querySelector('.mobile-nav'),
      mobileMenu = document.querySelector('#mobile-menu'),
      heroText = document.querySelector('h1'),
      hamburger = document.querySelector('#hamburger-icon'),
      heroHeight = document.querySelector('#hero').clientHeight,
      headerHeight = document.querySelector('header').clientHeight,
      roomSlider = function roomSlider() {
    var current = 0,
        slides = document.querySelectorAll('.room-slider img');

    setInterval(function () {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
      }
      current = current != slides.length - 1 ? current + 1 : 0;
      slides[current].style.opacity = 1;
    }, 5000);
  },
      menu = {
    mobile: function mobile() {
      hamburger.addEventListener('click', function () {
        mobileNav.classList.toggle('mobile-nav-active');
      });

      mobileNav.addEventListener('click', function () {
        if (!window.matchMedia('(min-width: 1280px)').matches) {
          mobileNav.classList.remove('mobile-nav-active');
        }
      });

      nav.addEventListener('click', function () {
        menu.navBar();
      });

      window.onscroll = menu.scrolled;
    },
    scrolled: function scrolled() {
      var fromTop = window.pageYOffset;
      if (fromTop < heroHeight / 4) {
        heroText.className = "";
        mobileMenu.classList.add('hidden');
      } else if (fromTop > heroHeight / 4 && fromTop < headerHeight / 2 - 60) {
        heroText.classList.add('hero-text-fixed');
        mobileMenu.classList.remove('hidden');
      }

      if (window.matchMedia('(min-width: 1280px)').matches) {
        if (fromTop > headerHeight / 2 - 60 && fromTop < headerHeight * 0.85) {
          mobileNav.classList.remove('mobile-nav-active');
        } else if (fromTop > headerHeight * 0.85) {
          menu.navBar();
          mobileMenu.classList.remove('hidden');
          mobileNav.classList.add('mobile-nav-active');
        }
      } else {
        if (fromTop > headerHeight / 2 - 60 && fromTop < headerHeight * 0.825) {
          mobileMenu.classList.remove('hidden');
          hamburger.classList.add('hidden');
        } else if (fromTop > headerHeight * 0.825) {
          menu.navBar();
          mobileNav.classList.remove('mobile-nav-active');
        }
      }
    },
    navBar: function navBar() {
      mobileMenu.classList.remove('hidden');
      heroText.classList.add('hero-text-fixed');
      hamburger.classList.remove('hidden');
    },
    desktop: function desktop() {
      window.onscroll = menu.scrolled;
    }
  };

  if (window.matchMedia('(min-width: 1280px)').matches) {
    menu.desktop();
  } else {
    menu.mobile();
  }

  roomSlider();
};