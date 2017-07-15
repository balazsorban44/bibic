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
    mobile: function mobile() {
      hamburger.addEventListener('click', function () {
        navList.classList.toggle('hidden');
      });

      navList.addEventListener('click', function () {
        navList.classList.add('hidden');
      });
    },
    scrolled: function scrolled() {
      var fromTop = window.pageYOffset;
      console.log(fromTop);
    },
    desktop: function desktop() {
      navList.classList.remove('hidden');
      window.onscroll = menu.scrolled;
    }
  };

  if (window.matchMedia('(min-width: 2000px)').matches) {
    menu.desktop();
  } else {
    menu.mobile();
  }

  rooms.forEach(function (e, i) {
    roomSlider(i);
  });
};