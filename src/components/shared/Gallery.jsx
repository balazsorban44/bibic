import React from 'react'
import {Loading} from './Elements'
import {withStore} from '../db'
import {withRouter} from 'react-router-dom/'

const Gallery = ({
  path, galleries, count,
  item: Item, itemClassName,
  component: Component, componentProps
}) => {
  const children = galleries[path] ?
    Object
      .values(galleries[path])
      .slice(0, count)
      .map((itemProps, key) =>
        Item ?
          <Item
            key={key}
            {...{...itemProps,
              itemClassName}}
          /> :
          <GalleryItem
            key={key}
            {...itemProps}
          />
      ) :
    <Loading/>

  return (
    Component ?
      <Component {...componentProps}>
        {children}
      </Component> :
      <div className="gallery">
        {children}
      </div>
  )
}


export default withRouter(withStore(Gallery))


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