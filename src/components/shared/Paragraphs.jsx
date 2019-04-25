import React from 'react'
import {Loading} from './Elements'
import {withStore} from '../db'
import Fade from "react-reveal/Fade"

const Paragraphs = ({path, paragraphs}) =>
  <>
    {paragraphs[path] ?
      Object
        .values(paragraphs[path])
        .map(({text}, index) =>
          <Fade
            bottom
            key={index}
          >
            <p>{text}</p>
          </Fade>
        ) :
      <Loading/>
    }
  </>

export default withStore(Paragraphs)