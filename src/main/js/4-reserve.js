// TODO Simplify
const Reserve = {
  reserve() {

    Array.from(reserveButtons).forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault()
        formTitle.innerText = `Szobafoglalás ${element.getAttribute('data-room-size')} személy részére`
        let message = {}
        form.style.transform = 'scale(1) translate(-50%, -50%)'

        fields.forEach((el) => {
          el.addEventListener('input', () => {
            message[el.getAttribute('data-name')] = el.value
            formMessage.value = `
Név: ${message.name}
E-mail cím: ${message.mail}
Telefonszám: ${message.tel}
Kívánt érkezés: ${message.arrive}
Kívánt távozás: ${message.depart}
Kívánt szoba méret: ${element.getAttribute('data-room-size')} személy
Egyéb információ: ${message.text}`
          })
        })
        closeForm.addEventListener('click', () => {
          form.style.transform = 'scale(0)'
        })
      })
    })

  },

  init() {
    this.reserve()
  }
}
