window.addEventListener('load', function load(){
    window.removeEventListener('load', load, false)
    init()
},false)

const init = () => {

  const nav = document.querySelector('nav'),
        navList = nav.querySelector('ul'),
        navListFromTop = navList.offsetTop,
        hamburger = document.querySelector('#hamburger'),
        rooms = document.querySelectorAll('.room'),
        heroTitle = document.querySelector('#hero-title'),
        roomTitles = document.querySelectorAll('.room-text h4'),
        roomBodies = document.querySelectorAll('.room-text-body'),


  toggleRoomText = (elements) => {
    elements.forEach( (element, index) => {
    element.addEventListener("click", () => {
      roomBodies[index].classList.toggle('room-text-hidden')
    })
  })},

  roomSlider = (roomIndex) => {
    let current = 0,
        slides = rooms[roomIndex].querySelectorAll('.room-slider img')
    setInterval( () => {
      slides.forEach((e) => {
        e.style.opacity = 0
      })
      current = (current != slides.length - 1) ? current + 1 : 0
      slides[current].style.opacity = 1
    }, 5000)

  },
  menu = {
    smallScreen() {
      hamburger.addEventListener('click', () =>{
        navList.classList.toggle('hidden')
        hamburger.classList.toggle('hamburger-active')
      })

      navList.addEventListener('click', () =>{
        hamburger.classList.toggle('hamburger-active')
        navList.classList.add('hidden')
      })

    },
    scrolled(){
      let fromTop = window.pageYOffset,
          w = window.innerWidth
      if (!('ontouchstart' in window)) {
        if (fromTop > navListFromTop - 60) {
            heroTitle.classList.add('hero-title-fixed')
        } else {
          heroTitle.style.transition = 'background-color .2s'
          heroTitle.style.top = `${w*0.15 - fromTop/3}px`
          heroTitle.style.transform = `scale(${3.5 - fromTop/400})`
          heroTitle.classList.remove('hero-title-fixed')
        }
      } else {
        if (fromTop > navListFromTop/4) {
            heroTitle.classList.add('hero-title-fixed')
        } else {
          heroTitle.classList.remove('hero-title-fixed')
        }
      }
      if (fromTop > navListFromTop - 60) {
        navList.classList.add('menu-fixed')
        heroTitle.style.backgroundColor = '#1f1511'
        heroTitle.querySelector('span').style.color = '#fafafa'
      } else {
        heroTitle.style.backgroundColor = ''
        heroTitle.querySelector('span').style.color = '#1f1511'
        navList.classList.remove('menu-fixed')
      }

    },

    bigScreen() {
      navList.classList.remove('hidden')
      const roomList = navList.querySelector('ul'),
            roomListToggle = navList.querySelector('#rooms-menu a')
      roomList.classList.add('roomlist-hidden')

      roomListToggle.addEventListener('click', (e) =>{
          e.preventDefault()
          roomList.classList.toggle('roomlist-hidden')
      })
      roomList.addEventListener('click', () =>{
          roomList.classList.toggle('roomlist-hidden')
      })
      toggleRoomText(roomTitles)
      toggleRoomText(roomBodies)
      window.onscroll = menu.scrolled
    }

  }

  const resized = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      menu.bigScreen()
    } else {
      menu.smallScreen()
      window.addEventListener('hashchange', function() {
        window.scrollTo(0, window.pageYOffset - 60)
      });
    }

    rooms.forEach((e,i) => {
      roomSlider(i)
    })
  }

  resized()
  window.addEventListener('resize', () =>{
    resized()
  })

}
