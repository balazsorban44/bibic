import React from 'react'
import {Loading} from './Elements'
import {withStore} from '../db'

export const Gallery = ({
  galleries, count, path
}) => {
  path = path.replace("/", "")

  const children = galleries[path] ?
    Object
      .values(galleries[path])
      .slice(0, count)
      .map((itemProps, key) =>
        <GalleryItem
          key={key}
          {...itemProps}
        />
      ) :
    <Loading/>

  return (
    <div className="gallery">{children}</div>
  )
}


export default withStore(Gallery)


export const GalleryItem = ({
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