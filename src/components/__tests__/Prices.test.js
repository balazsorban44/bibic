import {Prices} from "../Prices"


describe("Prices component", () => {
  const props = {rooms: []}
  const wrapper = shallow(<Prices {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("updates minimum price", () => {
    const newProps = {rooms: [
      {prices:
        {table:
          {breakfast:
            [
              [
                {name: "1 adult", price: 1},
                {name: "1 adult 1 child", price: 2}
              ]
            ]}}}
    ]}
    const spy = jest.spyOn(wrapper.instance(), "updateMinPrice")
    wrapper.setProps(newProps)
    expect(spy).toBeCalledWith(newProps.rooms)
    expect(wrapper.state("minPrice")).toBe(1)
  })
})