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
      ref = firebase.database().ref().child('rooms'),
      roomNumber = $.querySelectorAll('.room-text h4'),
      roomText = $.querySelectorAll('.room-text-body')

// Reserve form
const form = $.querySelector('form'),
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
      reserveButtons = $.querySelectorAll('.reserve-btn')
