'use strict';

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

var init = function init() {
  var nav = document.querySelector('nav'),
      navList = nav.querySelector('ul'),
      hamburger = document.querySelector('#hamburger'),
      rooms = document.querySelectorAll('.room'),
      heroTitle = document.querySelector('#hero-title'),
      navListFromTop = navList.offsetTop,
      roomSlider = function roomSlider(roomIndex) {
    var current = 0,
        slides = rooms[roomIndex].querySelectorAll('.room-slider img');
    setInterval(function () {
      slides.forEach(function (e) {
        e.style.opacity = 0;
      });
      current = current != slides.length - 1 ? current + 1 : 0;
      slides[current].style.opacity = 1;
    }, 5000);
  },
      menu = {
    smallScreen: function smallScreen() {
      hamburger.addEventListener('click', function () {
        navList.classList.toggle('hidden');
        hamburger.classList.toggle('hamburger-active');
      });

      navList.addEventListener('click', function () {
        hamburger.classList.toggle('hamburger-active');
        navList.classList.add('hidden');
      });
    },
    scrolled: function scrolled() {
      var fromTop = window.pageYOffset,
          w = window.innerWidth;
      if (!('ontouchstart' in window)) {
        if (fromTop > navListFromTop - 60) {
          heroTitle.classList.add('hero-title-fixed');
        } else {
          heroTitle.style.transition = 'background-color .2s';
          heroTitle.style.top = w * 0.15 - fromTop / 3 + 'px';
          heroTitle.style.transform = 'scale(' + (3.5 - fromTop / 400) + ')';
          heroTitle.classList.remove('hero-title-fixed');
        }
      } else {
        if (fromTop > navListFromTop / 4) {
          heroTitle.classList.add('hero-title-fixed');
        } else {
          heroTitle.classList.remove('hero-title-fixed');
        }
      }
      if (fromTop > navListFromTop - 60) {
        navList.classList.add('menu-fixed');
        heroTitle.style.backgroundColor = '#1f1511';
        heroTitle.querySelector('span').style.color = '#fafafa';
      } else {
        heroTitle.style.backgroundColor = '';
        heroTitle.querySelector('span').style.color = '#1f1511';
        navList.classList.remove('menu-fixed');
      }
    },
    bigScreen: function bigScreen() {
      navList.classList.remove('hidden');
      var roomList = navList.querySelector('ul'),
          roomListToggle = navList.querySelector('.szobak a');
      roomList.classList.add('roomlist-hidden');

      roomListToggle.addEventListener('click', function (e) {
        e.preventDefault();
        roomList.classList.toggle('roomlist-hidden');
      });
      roomList.addEventListener('click', function () {
        roomList.classList.toggle('roomlist-hidden');
      });

      window.onscroll = menu.scrolled;
    }
  };

  var resized = function resized() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      menu.bigScreen();
    } else {
      menu.smallScreen();
    }

    rooms.forEach(function (e, i) {
      roomSlider(i);
    });
  };

  resized();
  window.addEventListener('resize', function () {
    resized();
  });
};