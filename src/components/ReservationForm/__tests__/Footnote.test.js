import Footnote from "../Footnote"


it("renders correctly", () => {
  const wrapper = shallow(<Footnote/>)
  expect(wrapper).toMatchSnapshot()

})