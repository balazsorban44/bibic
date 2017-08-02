'use strict';

// Load JavaScript only after the page has loaded.

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  init();
}, false);

// OPENING TAG OF init() (Ends in 5-index.js)
var init = function init() {

  var $ = document;

  // Header section
  var nav = $.querySelector('nav'),
      navList = nav.querySelector('ul'),
      navListFromTop = navList.offsetTop,
      hamburger = $.querySelector('#hamburger'),
      heroTitle = $.querySelector('#hero-title'),
      heroTitleFromTop = heroTitle.offsetTop,
      heroTitleScale = new WebKitCSSMatrix(window.getComputedStyle(heroTitle).getPropertyValue('transform')).a,
      roomList = navList.querySelector('ul'),
      roomListToggle = navList.querySelector('#rooms-menu a'),
      mainFromTop = $.querySelector('main').offsetTop;
  // Rooms section
  var rooms = $.querySelectorAll('.room'),
      ref = firebase.database().ref().child('rooms'),
      roomNumber = $.querySelectorAll('.room-text h4'),
      roomText = $.querySelectorAll('.room-text-body');

  // Reserve form
  var form = $.querySelector('form'),
      formTitle = form.querySelector('h1'),
      closeForm = form.querySelector('span'),
      name = form.querySelector('.form-name'),
      mail = form.querySelector('.form-email'),
      tel = form.querySelector('.form-tel'),
      arrive = form.querySelector('#arrival-date input'),
      depart = form.querySelector('#departure-date input'),
      text = form.querySelector('.form-text textarea'),
      fields = [name, mail, tel, arrive, depart, text],
      formMessage = form.querySelector('.form-message'),
      reserveButtons = $.querySelectorAll('.reserve-btn');

  // Handle the menubar
  // TODO Add smooth scrolling
  var Menu = {

    // Deal with screens smaller than 768px
    smallScreen: function smallScreen() {

      // Hamburger icon changes
      hamburger.addEventListener('click', function () {
        navList.classList.toggle('hidden');
        hamburger.classList.toggle('hamburger-active');
      });

      // Reset hamburger icon and hide enu on selected enu item (while jumping to a section on the page)
      navList.addEventListener('click', function () {
        hamburger.classList.toggle('hamburger-active');
        navList.classList.add('hidden');
      });
    },


    // Deal with screens bigger than 768px
    bigScreen: function bigScreen() {
      navList.classList.remove('hidden');

      // Highlight the active menu item
      navList.addEventListener('click', function (e) {
        Array.from(navList.children).forEach(function (el) {
          if (el.children[0] == e.target) {
            el.children[0].classList.add('menu-item-active');
          } else {
            el.children[0].classList.remove('menu-item-active');
          }

          // Hide submenu if a menu item is clicked, except it is the submenu itself
          if (e.target != navList.children[2].children[0]) {
            roomList.classList.add('roomlist-hidden');
          } else {
            // If submenu toggler is clicked, don't jump to its section, but open the submenu instead
            e.preventDefault();
          }
        });
      });

      // Hide the submenu by default on big screens
      roomList.classList.add('roomlist-hidden');

      // Toggle the submenu on click
      roomListToggle.addEventListener('click', function () {
        roomList.classList.toggle('roomlist-hidden');
      });
    },


    // Deal with scrolling events
    // TODO Check the breaking points, cause it is messy! 😠

    scrolled: function scrolled() {
      var fromTop = window.pageYOffset;

      if (!('ontouchstart' in window)) {
        if (fromTop > navListFromTop - 60) {
          heroTitle.classList.add('hero-title-fixed');
        } else {
          heroTitle.classList.remove('hero-title-fixed');
          heroTitle.style.opacity = '' + (1 - fromTop / navListFromTop);
          heroTitle.style.transform = 'scale(' + (heroTitleScale - fromTop / 300) + ') translateY(' + -fromTop / heroTitleFromTop * heroTitleScale * 2 + 'px)';
        }
      } else {
        if (fromTop > navListFromTop / 4) {
          heroTitle.classList.add('hero-title-fixed');
        } else {
          heroTitle.classList.remove('hero-title-fixed');
        }
        if (fromTop > mainFromTop) {
          nav.classList.add('nav-fixed');
        } else {
          nav.classList.remove('nav-fixed');
        }
      }
      if (fromTop > navListFromTop) {
        navList.classList.add('menu-fixed');
      } else {
        navList.classList.remove('menu-fixed');
      }
    },


    // The initialization of the menu's functionality
    init: function init() {

      // Decide if it is a big or a small screen, and run the appropriate method
      if (window.matchMedia('(min-width: 768px)').matches) {
        this.bigScreen();
      } else {
        this.smallScreen();
      }

      // Listen to scroll changes
      window.onscroll = this.scrolled;
    }
  };

  var Rooms = {
    availableRooms: function availableRooms() {
      ref.on("value", function (snapshot) {
        for (var i = 1; i < rooms.length + 1; i++) {
          rooms[i - 1].querySelector('.isReserved').innerText = snapshot.val()[i].available ? 'Elérhető' : 'Foglalt';
        }
      }, function (error) {
        console.log("Error: " + error.code);
      });
    },


    // Toggling the visibility of rooms' texts
    toggleRoomText: function toggleRoomText(elements) {
      elements.forEach(function (element, index) {
        element.addEventListener("click", function () {
          roomText[index].classList.toggle('room-text-hidden');
        });
      });
    },


    // Image slider of the individual rooms
    // TODO Better solution to this? Pure CSS?
    roomSlider: function roomSlider(roomIndex) {
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


    // The initialization of the rooms' functionality
    init: function init() {
      var _this = this;

      this.availableRooms();

      // Run the slider in each room section
      rooms.forEach(function (e, i) {
        _this.roomSlider(i);
      });

      // Toggle the text by both the text itself and the room number
      this.toggleRoomText(roomNumber);
      this.toggleRoomText(roomText);
    }
  };

  // TODO Simplify
  var Reserve = {
    reserve: function reserve() {

      Array.from(reserveButtons).forEach(function (element) {
        element.addEventListener('click', function (e) {
          e.preventDefault();
          formTitle.innerText = 'Szobafoglal\xE1s ' + element.getAttribute('data-room-size') + ' szem\xE9ly r\xE9sz\xE9re';
          var message = {};
          form.style.transform = 'scale(1) translate(-50%, -50%)';

          fields.forEach(function (el) {
            el.addEventListener('input', function () {
              message[el.getAttribute('data-name')] = el.value;
              formMessage.value = '\nN\xE9v: ' + message.name + '\nE-mail c\xEDm: ' + message.mail + '\nTelefonsz\xE1m: ' + message.tel + '\nK\xEDv\xE1nt \xE9rkez\xE9s: ' + message.arrive + '\nK\xEDv\xE1nt t\xE1voz\xE1s: ' + message.depart + '\nK\xEDv\xE1nt szoba m\xE9ret: ' + element.getAttribute('data-room-size') + ' szem\xE9ly\nEgy\xE9b inform\xE1ci\xF3: ' + message.text;
            });
          });
          closeForm.addEventListener('click', function () {
            form.style.transform = 'scale(0)';
          });
        });
      });
    },
    init: function init() {
      this.reserve();
    }
  };

  // TODO Add gallery functionality
  var Gallery = {
    init: function init() {
      lory(document.querySelector('.js_simple'), {
        infinite: 0,
        enableMouseEvents: 1
      });
    }
  };

  var Map = {
    init: function init() {
      var map = new google.maps.Map($.querySelector('#map-canvas'), {
        center: { lat: 46.394617, lng: 17.505221 },
        zoom: 15,
        scrollwheel: false,
        styles: [{
          "elementType": "geometry",
          "stylers": [{
            "hue": "#ff4400"
          }, {
            "saturation": -68
          }, {
            "lightness": -4
          }, {
            "gamma": 0.72
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.icon"
        }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry",
          "stylers": [{
            "hue": "#0077ff"
          }, {
            "gamma": 3.1
          }]
        }, {
          "featureType": "water",
          "stylers": [{
            "hue": "#00ccff"
          }, {
            "gamma": 0.44
          }, {
            "saturation": -33
          }]
        }, {
          "featureType": "poi.park",
          "stylers": [{
            "hue": "#44ff00"
          }, {
            "saturation": -23
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "hue": "#007fff"
          }, {
            "gamma": 0.77
          }, {
            "saturation": 65
          }, {
            "lightness": 99
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "gamma": 0.11
          }, {
            "weight": 5.6
          }, {
            "saturation": 99
          }, {
            "hue": "#0091ff"
          }, {
            "lightness": -86
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "lightness": -48
          }, {
            "hue": "#ff5e00"
          }, {
            "gamma": 1.2
          }, {
            "saturation": -23
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "saturation": -64
          }, {
            "hue": "#ff9100"
          }, {
            "lightness": 16
          }, {
            "gamma": 0.47
          }, {
            "weight": 2.7
          }]
        }]
      });
    }
  };

  function run() {
    // Initialize Menu
    Menu.init();

    // Initialize Rooms
    Rooms.init();

    // Initialize Gallery
    Gallery.init();

    // Initialize map
    Map.init();

    // Initialize Reserve
    Reserve.init();
  }
  run();
  window.addEventListener('resize', function () {
    run();
  });

  // Jump to the sections plus the height of the menubar
  // TODO Fix where to jump
  window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - navList.clientHeight + 1);
  });

  // CLOSING TAG OF init() (Begins in 1-global-vars.js)
};