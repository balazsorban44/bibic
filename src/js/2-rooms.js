const toggleRoomText = (elements) => {
  elements.forEach( (element, index) => {
    element.addEventListener("click", () => {
      roomBodies[index].classList.toggle('room-text-hidden')
    })
  })
}

const roomSlider = (roomIndex) => {
  let current = 0,
      slides = rooms[roomIndex].querySelectorAll('.room-slider img')
  setInterval( () => {
    slides.forEach((e) => {
      e.style.opacity = 0
    })
    current = (current != slides.length - 1) ? current + 1 : 0
    slides[current].style.opacity = 1
  }, 5000)
}
