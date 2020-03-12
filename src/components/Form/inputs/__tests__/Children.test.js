import Children from '../Children'


describe("Children component", () => {
  const values = ["6-12", "6-12"]
  const updateReservation = jest.fn()
  const wrapper = mount(
    <Children
      max={3}
      onChange={updateReservation}
      values={values}
    />
  )
  const buttons = wrapper.find("button")

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Age changed", () => {
    const name = 0
    const select = wrapper.find("select").first()
    it("correct age group", () => {
      select.simulate("change", {target: {name, value: "0-6"}})
      expect(updateReservation).toBeCalledWith("children", ["0-6", "6-12"])
    })
    it("incorrect age group", () => {
      select.simulate("change", {target: {name, value: "-"}})
      expect(updateReservation).toBeCalledWith("children", ["6-12", "6-12"])
    })
  })

  describe("Increase", () => {
    const value = [...values, "6-12"]
    const increaseButton = buttons.findWhere(e => e.prop("value") === value.length)

    it("add 1 if maxPeople not reached", () => {
      increaseButton.simulate("click", {target: {name, value: value.length}})
      expect(updateReservation).toBeCalledWith(name, value)
    })

    it("do not add if maxPeople reached", () => {
      wrapper.setProps({max: 2})
      increaseButton.simulate("click", {target: {name, value: value.length}})
      expect(updateReservation).toBeCalledWith(name, values)
    })
  })

  describe("Decrease", () => {
    const value = [...values]
    value.pop()

    const decreaseButton = buttons.findWhere(e => e.prop("value") === value.length)

    it("do not allow less than 0", () => {
      decreaseButton.simulate("click", {target: {name, value}})
      expect(updateReservation).toBeCalledWith(name, values)
    })
  })
})