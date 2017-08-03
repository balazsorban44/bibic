const Rooms = {

  availableRooms(){
    ref.on("value", (snapshot) => {
      for (let i = 1; i < rooms.length+1; i++) {
        rooms[i-1].querySelector('.isReserved').innerText = snapshot.val()[i].available ? 'Elérhető' : 'Foglalt'
      }

    }, (error) => {
      console.log("Error: " + error.code)
    })

  },





  // Toggling the visibility of rooms' texts
  toggleRoomText(elements) {
    elements.forEach( (element, index) => {
      element.addEventListener("click", () => {
        roomText[index].classList.toggle('room-text-hidden')
      })
    })
  },

  // Image slider of the individual rooms
  // TODO Better solution to this? Pure CSS?
  roomSlider(roomIndex) {
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

  // The initialization of the rooms' functionality
  init() {

    this.availableRooms()

    // Run the slider in each room section
    rooms.forEach((e,i) => {
      this.roomSlider(i)
    })

    // Toggle the text by both the text itself and the room number
    this.toggleRoomText(roomNumber)
    this.toggleRoomText(roomText)
  }
}
