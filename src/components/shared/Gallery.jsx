import React from 'react'
import {Loading} from './Elements'
import {withStore} from '../db'

const Gallery = ({
  path, galleries, item: Item, count
}) =>
  <div className="gallery">
    {galleries[path] ?
      Object
        .values(galleries[path])
        .slice(0, count)
        .map((itemProps, key) =>
          Item ?
            <Item
              key={key}
              {...itemProps}
            /> :
            <GalleryItem
              key={key}
              {...itemProps}
            />
        ) :
      <Loading/>}
  </div>


export default withStore(Gallery)


const GalleryItem = ({
  SIZE_1024, SIZE_1440, SIZE_640, desc, title
}) =>
  <picture>
    <source
      media="(min-width: 960px)"
      srcSet={SIZE_1024}
    />
    <source
      media="(min-width: 1280px)"
      srcSet={SIZE_1440}
    />
    <img
      alt={desc !== "" ? desc : title}
      src={SIZE_640}
    />
  </picture>