window.addEventListener('load', function load(){
    window.removeEventListener('load', load, false)
    init()
},false)

const init = () => {
  const nav = document.querySelector('nav'),
        mobileNav = document.querySelector('.mobile-nav'),
        mobileMenu = document.querySelector('#mobile-menu'),
        heroText = document.querySelector('h1'),
        hamburger = document.querySelector('#hamburger-icon'),
        heroHeight = document.querySelector('#hero').clientHeight,
        headerHeight = document.querySelector('header').clientHeight,
  roomSlider = () => {
    let current = 0,
    slides = document.querySelectorAll('.room-slider img');

    setInterval(function() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
      }
      current = (current != slides.length - 1) ? current + 1 : 0;
      slides[current].style.opacity = 1;
    }, 5000);

  },
  menu = {
    mobile() {
      hamburger.addEventListener('click', () =>{
        mobileNav.classList.toggle('mobile-nav-active')
      })

      mobileNav.addEventListener('click', () =>{
        if (!window.matchMedia('(min-width: 1280px)').matches) {
          mobileNav.classList.remove('mobile-nav-active')
        }

      })

      nav.addEventListener('click', () =>{
        menu.navBar()
      })

      window.onscroll = menu.scrolled

    },
    scrolled(){
      let fromTop = window.pageYOffset
      if (fromTop < heroHeight/4) {
        heroText.className = ""
        mobileMenu.classList.add('hidden')

      } else if (fromTop > heroHeight/4 && fromTop < headerHeight/2 - 60) {
        heroText.classList.add('hero-text-fixed')
        mobileMenu.classList.remove('hidden')
      }

      if (window.matchMedia('(min-width: 1280px)').matches) {
        if (fromTop > headerHeight/2 - 60 && fromTop < headerHeight*0.85) {
          mobileNav.classList.remove('mobile-nav-active')
        } else if (fromTop > headerHeight*0.85){
          menu.navBar()
          mobileMenu.classList.remove('hidden')
          mobileNav.classList.add('mobile-nav-active')
        }

      } else {
        if (fromTop > headerHeight/2 - 60 && fromTop < headerHeight*0.825) {
          mobileMenu.classList.remove('hidden')
          hamburger.classList.add('hidden')
        } else if (fromTop > headerHeight*0.825){
          menu.navBar()
          mobileNav.classList.remove('mobile-nav-active')
        }

      }
    },

    navBar() {
      mobileMenu.classList.remove('hidden')
      heroText.classList.add('hero-text-fixed')
      hamburger.classList.remove('hidden')
    },

    desktop() {
      window.onscroll = menu.scrolled
    }

  }




  if (window.matchMedia('(min-width: 1280px)').matches) {
    menu.desktop()
  } else {
    menu.mobile()
  }

  roomSlider()
  





}
