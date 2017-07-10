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
    var hero = document.querySelector('#hero'),
        heroNav = document.querySelector('nav'),
        heroText = document.querySelector('h1'),
        heroImg = document.querySelector('#hero-img'),
        hamburger = document.querySelector('#hamburger-menu'),
        intro = document.querySelector('#bemutatkozas'),
        w = window.innerWidth;

    hamburger.addEventListener('click', function () {
      heroNav.classList.toggle('hidden');
    });
    // Rx.Observable.fromEvent(window, 'scroll')
    //   .debounceTime(100)
    //   .subscribe(
    //     () => scrolled()
    //     // (event) => console.log(event)
    //   )

    window.onscroll = scrolled;
    function scrolled() {
      var fromTop = window.scrollY;
      console.log(fromTop);
      if (fromTop < 182) {
        heroImg.style.marginTop = '-' + fromTop + 'px';
        heroText.style.transform = 'scale(' + (1 - fromTop / w * .9) + ')';
        hero.style.height = 300 - fromTop + 'px';
        heroNav.style.top = 300 - fromTop + 'px';
        hero.classList.remove('hero-fixed');
      } else if (fromTop > 163 && fromTop < 240) {
        hero.style.height = 300 - fromTop + 'px';
        heroNav.style.top = 300 - fromTop + 'px';
        heroText.style.transform = 'scale(' + (1 - fromTop / w * .9) + ')';
        heroImg.classList.remove('hero-img-fixed');
        hero.classList.add('hero-fixed');
      } else if (fromTop > 240 && fromTop < 440) {
        heroNav.style.top = 300 - fromTop + 'px';
        heroNav.classList.remove('hero-nav-fixed');
        if (!hamburger.classList.contains('hidden')) {
          hamburger.classList.add('hidden');
        }
        heroNav.classList.remove('nav-mobile', 'hidden');
      } else {
        hamburger.classList.remove('hidden');
        heroNav.classList.add('nav-mobile', 'hidden');
        heroImg.classList.add('hero-img-fixed');
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
    }, 3000);
  }
};