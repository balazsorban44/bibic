// Load JavaScript only after the page has loaded.

window.addEventListener('load', function load(){
    window.removeEventListener('load', load, false)
    init()
},false)


// OPENING TAG OF init() (Ends in 5-index.js)
const init = () => {

const $ = document

// Header section
const nav = $.querySelector('nav'),
      navList = nav.querySelector('ul'),
      navListFromTop = navList.offsetTop,
      hamburger = $.querySelector('#hamburger'),
      heroTitle = $.querySelector('#hero-title'),
      heroTitleFromTop = heroTitle.offsetTop,
      heroTitleScale = new WebKitCSSMatrix(window.getComputedStyle(heroTitle).getPropertyValue('transform')).a,
      roomList = navList.querySelector('ul'),
      roomListToggle = navList.querySelector('#rooms-menu a'),
      mainFromTop = $.querySelector('main').offsetTop
// Rooms section
const rooms = $.querySelectorAll('.room'),
      roomNumber = $.querySelectorAll('.room-text h4'),
      roomText = $.querySelectorAll('.room-text-body')


// Reserve form
const form = $.querySelector('form'),
      closeFormBtn = form.querySelector('span'),
      formName = form.querySelector('.form-name'),
      formTel = form.querySelector('.form-tel'),
      formText = form.querySelector('textarea'),
      reserveButtons = $.querySelectorAll('.reserve-btn')
