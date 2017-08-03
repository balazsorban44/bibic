// Handle the menubar
// TODO Add smooth scrolling
const Menu = {

  // Deal with screens smaller than 768px
  smallScreen() {

    // Hamburger icon changes
    hamburger.addEventListener('click', () =>{
      navList.classList.toggle('hidden')
      hamburger.classList.toggle('hamburger-active')
    })

    // Reset hamburger icon and hide enu on selected enu item (while jumping to a section on the page)
    navList.addEventListener('click', () =>{
      hamburger.classList.toggle('hamburger-active')
      navList.classList.add('hidden')
    })

  },

  // Deal with screens bigger than 768px
  bigScreen() {
      navList.classList.remove('hidden')

      // Highlight the active menu item
      navList.addEventListener(('click'), (e) => {
          Array.from(navList.children).forEach((el) => {
            if (el.children[0] == e.target) {
              el.children[0].classList.add('menu-item-active')
            } else {
              el.children[0].classList.remove('menu-item-active')
            }

            // Hide submenu if a menu item is clicked, except it is the submenu itself
            if (e.target != navList.children[2].children[0]) {
              roomList.classList.add('roomlist-hidden')
            } else {
              // If submenu toggler is clicked, don't jump to its section, but open the submenu instead
              e.preventDefault()
            }

          })
      })

      // Hide the submenu by default on big screens
      roomList.classList.add('roomlist-hidden')

      // Toggle the submenu on click
      roomListToggle.addEventListener('click', () => {
        roomList.classList.toggle('roomlist-hidden')
      })

  },

  // Deal with scrolling events
  // TODO Check the breaking points, cause it is messy! 😠

  scrolled() {
    const fromTop = window.pageYOffset

    if (!('ontouchstart' in window)) {
      if (fromTop > navListFromTop - 60) {
        heroTitle.classList.add('hero-title-fixed')
      } else {
        heroTitle.classList.remove('hero-title-fixed')
        heroTitle.style.opacity = `${1 - fromTop/navListFromTop}`
        heroTitle.style.transform = `scale(${heroTitleScale - fromTop/300}) translateY(${-fromTop/heroTitleFromTop*heroTitleScale*2}px)`
      }
    } else {
      if (fromTop > navListFromTop/4) {
        heroTitle.classList.add('hero-title-fixed')
      } else {
        heroTitle.classList.remove('hero-title-fixed')
      }
      if (fromTop > mainFromTop) {
        nav.classList.add('nav-fixed')
      } else {
        nav.classList.remove('nav-fixed')
      }
    }
    if (fromTop > navListFromTop) {
      navList.classList.add('menu-fixed')
    } else {
      navList.classList.remove('menu-fixed')
    }
  },

  // The initialization of the menu's functionality
  init() {

    // Decide if it is a big or a small screen, and run the appropriate method
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.bigScreen()
    } else {
      this.smallScreen()
    }

    // Listen to scroll changes
    window.onscroll = this.scrolled

  }

}
