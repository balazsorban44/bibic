import React, {Component} from 'react'
import ReactSlider from 'react-slick'
import {Prev, Next} from '../shared/Elements'
import { DB } from '../../lib/firebase'

export default class Slider extends Component {

  state = {
    slider: null
  }
  componentDidMount() {
    DB.ref(this.props.databaseRef)
    .orderByChild("picture/name")
    .on("child_added", snap => {
      this.setState({
        slider: {
          ...this.state.slider,
          [snap.key]: snap.val()
        }
      })
    })

    // this.setState({
    //   slider: {
    //     test: {
    //       desc: "Lorem ipsum dolor sit amet.",
    //       picture: {
    //         name: "Name",
    //         resized: "https://fillmurray.com/1920/1090",
    //         original: "https://fillmurray.com/1024/768"
    //       }
    //     },
    //     test2: {
    //       desc: "Lorem ipsum dolor sit amet.",
    //       picture: {
    //         name: "Name2",
    //         resized: "https://fillmurray.com/1920/1080",
    //         original: "https://fillmurray.com/1024/768"
    //       }
    //     }
    //   }
    // })
  }

  render() {
    const {slider} = this.state
    const {title, sectionId, alignRight} = this.props
    return (
      slider ?
        <section
          id={sectionId}
          className="slider"
          onTouchStart={this.handleSwipe}
        >
          <h2 className={alignRight && "slide-title-right"}>{title}</h2>
          <ReactSlider
            className="slider-container"
            prevArrow={<Prev/>}
            nextArrow={<Next/>}
          >
            {Object.keys(slider).map(slideId => {
              const {desc, picture: {name, resized}} = slider[slideId]
              return (
                <div key={slideId} className="slide">
                  <div className={`slide-content ${alignRight && "slide-content-right"}`}>
                    <img alt={name} src={resized}/>
                    <p>{desc}</p>
                  </div>
                </div>
              )
            })}
          </ReactSlider>
        </section> :
        null
    )
  }
}