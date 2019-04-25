import ReservationDetails from ".."
import People from '../People'
import {FormGroup} from '../../../shared/Form'

describe("ReservationDetails component", () => {
  const maxPeople = 0
  const formGroups = ["dates", "services", "message"]

  const wrapper = shallow(
    <ReservationDetails maxPeople={maxPeople}/>
  )

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("FormGroups", () => {

    it("have titles", () => {
      wrapper.find(FormGroup).map(e => expect(e.props()).toHaveProperty("title"))
    })

    formGroups.map(formGroup =>
      test(`${formGroup} is present`, () => {
        expect(wrapper.findWhere(e => e.hasClass(formGroup))).toHaveLength(1)
      })
    )

    it("people is present", () => expect(wrapper.find(People).parent().type()).toBe(FormGroup))

  })


  describe("Maximum people", () => {

    it("passed to People", () => {
      expect(wrapper.find(People).props()).toHaveProperty("maxPeople")
    })

    it("shown in FormGroup title", () => {
      expect(wrapper.find(People).parent().prop("title")).toContain(maxPeople)
    })

  })


})