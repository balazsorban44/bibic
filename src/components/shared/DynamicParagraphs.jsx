import React, {Fragment} from 'react'
import {Loading} from './Elements'
import {Data} from '../db'

const DynamicParagraphs = ({path}) =>
  <Data.Consumer>
    {({state: {paragraphs}}) =>
      <Fragment>
        {paragraphs[path] ? Object.values(paragraphs[path]).map((paragraph, index) => <p key={index}>{paragraph}</p>) : <Loading/>}
      </Fragment>
    }
  </Data.Consumer>

export default DynamicParagraphs