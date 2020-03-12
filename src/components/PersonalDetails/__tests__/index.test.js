import PersonalDetails from '..'
import PersonalDetail from '../PersonalDetail'

describe("PersonalDetails component", () => {
  const props = {
    personalDetails: {
      name: "name",
      email: "email@email.hu",
      tel: "+123456",
      address: "street 13."
    },
    onChange: jest.fn(),
    disabled: false
  }
  const wrapper = shallow(<PersonalDetails {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  test(`all PersonalDetail inherits disabled and onChange`, () => {
    wrapper.find(PersonalDetail).forEach(e => {
      expect(e.prop("disabled")).toBe(props.disabled)
      expect(e.prop("onChange")).toBe(props.onChange)
    })
  })

})