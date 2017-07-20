window.addEventListener('load', function load(){
    window.removeEventListener('load', load, false)
    init()
},false)


// OPENING TAG OF init() (Ends in 5-index.js)
const init = () => {


// Header section
const nav = document.querySelector('nav'),
      navList = nav.querySelector('ul'),
      navListFromTop = navList.offsetTop,
      hamburger = document.querySelector('#hamburger'),
      heroTitle = document.querySelector('#hero-title'),
      roomList = navList.querySelector('ul'),
      roomListToggle = navList.querySelector('#rooms-menu a')

// Rooms section
const rooms = document.querySelectorAll('.room'),
      roomTitles = document.querySelectorAll('.room-text h4'),
      roomBodies = document.querySelectorAll('.room-text-body')
