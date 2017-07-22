// TODO Simplify
// TODO Add check for date and phone number input
const Reserve = {
  reserve() {

    Array.from(reserveButtons).forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        let preText = `Tisztelt Bíbic vendégházak!

Érdeklődöm, hogy
[Érkezési dátum] és [Távozási dátum]
között elérhető-e szoba ${el.getAttribute('data-room-size')} személy részére?

Tisztelettel`
        formText.value = preText
        formName.addEventListener('input', () => {
          preText = `Tisztelt Bíbic vendégházak!

Érdeklődöm, hogy
[Érkezési dátum] és [Távozási dátum]
között elérhető-e szoba ${el.getAttribute('data-room-size')} személy részére?

Tisztelettel ${formName.value}
          `
          formText.value = preText

        })
        form.style.transform = 'scale(1)'
        form.style.opacity = 1
        closeFormBtn.addEventListener('click', () => {
          formText.value = ''
          form.style.transform = 'scale(0)'
          form.style.opacity = 0
        })
      })
    })

  },

  init() {
    this.reserve()
  }
}
