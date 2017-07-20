const menu = {
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
  bigScreen() {
      navList.classList.remove('hidden')
      roomList.classList.add('roomlist-hidden')

      roomListToggle.addEventListener('click', (e) => {
        e.preventDefault()
        roomList.classList.toggle('roomlist-hidden')
      })

      roomList.addEventListener('click', () => {
        roomList.classList.toggle('roomlist-hidden')
      })
      toggleRoomText(roomTitles)
      toggleRoomText(roomBodies)
      window.onscroll = menu.scrolled
  },
  scrolled() {
    let fromTop = window.pageYOffset,
    w = window.innerWidth
    if (!('ontouchstart' in window)) {
      if (fromTop > navListFromTop - 60) {
        heroTitle.classList.add('hero-title-fixed')
      } else {
        heroTitle.classList.remove('hero-title-fixed')
        heroTitle.style.transition = 'background-color .2s'
        heroTitle.style.top = `${w*0.15 - fromTop/3}px`
        heroTitle.style.left = `${-fromTop}px`
        heroTitle.style.transform = `scale(${3.5 - fromTop/400})`
      }
    } else {
      if (fromTop > navListFromTop/4) {
        heroTitle.classList.add('hero-title-fixed')
      } else {
        heroTitle.classList.remove('hero-title-fixed')
      }
    }
    if (fromTop > navListFromTop - 72) {
      navList.classList.add('menu-fixed')
    } else {
      navList.classList.remove('menu-fixed')
    }
  },

  init() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      menu.bigScreen()
    } else {
      menu.smallScreen()
    }

  }

}
