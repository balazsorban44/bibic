import React, {Component} from 'react'
import ReactSlider from 'react-slick'
import {Prev, Next} from '../shared/Elements'
import {DB} from '../../lib/firebase'

export default class Slider extends Component {

  state = {
    metadata: null,
    pictures: null
  }

  componentDidMount() {
    DB.ref(`${this.props.databaseRef}/pictures`)
      .orderByChild("order")
      .once("child_added", snap => {
        console.log(snap)
        
        this.setState(({pictures}) => ({pictures: [...pictures, [snap.key, snap.val()]]}))
      })
    DB.ref(`${this.props.databaseRef}/metadata`)
      .once("value", snap => {
        this.setState({metadata: snap.val() || {}})
      })

  }

  render() {
    const {
      metadata, pictures
    } = this.state

    const {
      title, sectionId, alignRight
    } = this.props
    return (
      (metadata && pictures) ?
        <section
          className="slider"
          id={sectionId}
          onTouchStart={this.handleSwipe}
        >
          <h2 className={alignRight && "slide-title-right"}>{title}</h2>
          <ReactSlider
            className="slider-container"
            nextArrow={<Next/>}
            prevArrow={<Prev/>}
          >
            {pictures.map(([
              key, {
                SIZE_ORIGINAL, SIZE_640, SIZE_1280, SIZE_1440
              }
            ]) => {
              let title = ""
              let desc = ""
              if (metadata[key]) {
                title = metadata[key].title
                desc = metadata[key].desc
              }
              return (
                <div
                  {...{key}}
                  className="slide"
                >
                  <div className={`slide-content ${alignRight && "slide-content-right"}`}>
                    <picture>
                      <source
                        media="(max-width: 640px)"
                        srcSet={SIZE_640}
                      />
                      <source
                        media="(max-width: 1280px)"
                        srcSet={SIZE_1280}
                      />
                      <source
                        media="(max-width: 1920px)"
                        srcSet={SIZE_1440}
                      />
                      <img
                        alt={title}
                        src={SIZE_ORIGINAL}
                      />
                    </picture>
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