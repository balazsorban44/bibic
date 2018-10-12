import React, {Fragment} from 'react'
import {Loading} from './Elements'
import {withStore} from '../db'

const Paragraphs = ({path, paragraphs}) =>
  <Fragment>
    {paragraphs[path] ?
      Object
        .values(paragraphs[path])
        .map(({text}, index) =>
          <p key={index}>{text}</p>
        ) :
      <Loading/>
    }
  </Fragment>

export default withStore(Paragraphs)