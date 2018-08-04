import React, {Component, Fragment} from 'react'
import Slider from 'react-slick'
import {Prev, Next, SwipeIcon} from './shared/Elements'
import {BackMenu} from '../components/Menu'
import {DB} from '../lib/firebase'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
export default class Foods extends Component {

  state = {
    metadata: null,
    pictures: [],
    isShowingSwipe: false
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    DB.ref("foods/pictures")
      .orderByChild("order")
      .once("child_added", snap => {
        this.setState(({pictures}) => ({pictures: [...pictures, [snap.key, snap.val()]]}))
      }).then(() => {

        DB.ref("foods/metadata")
          .once("value", snap => {
            this.setState({metadata: Object.values(snap.val())})
          })
      })
  }


  render() {
    const {
      metadata, pictures
    } = this.state
    return (
      <Fragment>
        <BackMenu/>
        <div
          id="etelek"
          onTouchStart={this.handleSwipe}
        >
          <Slider
            adaptiveHeight
            className="foods"
            nextArrow={<Next/>}
            prevArrow={<Prev/>}
          >
            {(metadata && pictures.length) && pictures.map(([
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
                  className="food"
                >
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
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
                </div>
              )
            })}
          </Slider>
          <SwipeIcon
            style={{
              position: "absolute",
              bottom: "10%"
            }}
          />
        </div>
      </Fragment>
    )
  }
}


