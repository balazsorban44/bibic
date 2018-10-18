import {mount} from 'enzyme'
import React from 'react'
import {FormSection, FormGroup} from ".."


describe("Form components", () => {
  const testTitle = "Test title"
  const testChild = "Test child"
  const testFootnote = "Test footnote"
  const testClass = "test-class"

  describe("FormSection component", () => {
    const formSectionWrapper = mount(
      <FormSection title={testTitle}>
        {testChild}
      </FormSection>
    )
    test("renders correctly", () => {
      expect(formSectionWrapper).toHaveLength(1)
    })

    test("has title", () => {
      expect(formSectionWrapper.find("h4").prop("children")).toBe(testTitle)
    })

    test("has children", () => {
      expect(formSectionWrapper.props().children).toBe(testChild)
    })

  })

  describe("FormGroup component", () => {
    describe("With props", () => {
      const formGroupWrapper = mount(
        <FormGroup
          className={testClass}
          footnote={testFootnote}
          title={testTitle}
        >
          {testChild}
        </FormGroup>
      )

      test("renders correctly", () => {
        expect(formGroupWrapper).toHaveLength(1)
      })

      test("has title", () => {
        expect(formGroupWrapper.find({children: testTitle})).toHaveLength(1)
      })

      test("has children", () => {
        expect(formGroupWrapper.find({children: testChild})).toHaveLength(1)
      })

      test("has class", () => {
        expect(formGroupWrapper.find({className: testClass})).toHaveLength(1)
      })

      test("has footnote", () => {
        expect(formGroupWrapper.find({className: "footnote"})).toHaveLength(1)
      })


    })

    describe("Without props", () => {
      const formGroupWrapper = mount(<FormGroup/>)
      test("has no title", () => {
        expect(formGroupWrapper.find("h5")).toHaveLength(0)
      })
      test("has no footnote", () => {
        expect(formGroupWrapper.find(".footnote")).toHaveLength(0)
      })
      test("has form-group class", () => {
        expect(formGroupWrapper.find(".form-group")).toHaveLength(1)
      })
    })
  })


})