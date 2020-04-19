import * as React from 'react'

export const Gallery = ({images}) => {
  return (
    <div className="gallery">
      {images.map((itemProps, key) =>
        <GalleryItem
          key={key}
          {...itemProps}
        />
      )
      }
    </div>
  )
}


export default Gallery


export const GalleryItem = ({
  SIZE_1024, SIZE_1440, SIZE_640, desc, title
}) =>
  desc ?
    <div className="gallery-item">
      <div className="img-wrapper">
        <GalleryImage
          alt={desc}
          sizes={{
            SIZE_640,
            SIZE_1024,
            SIZE_1440
          }}
        />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div> :
    <GalleryImage
      alt={title}
      sizes={{
        SIZE_640,
        SIZE_1024,
        SIZE_1440
      }}
    />


export const GalleryImage = ({sizes: {
  SIZE_640, SIZE_1024, SIZE_1440
}, alt}) =>
  <picture>
    <source
      media="(min-width: 540px)"
      srcSet={SIZE_1024}
    />
    <source
      media="(min-width: 1280px)"
      srcSet={SIZE_1440}
    />
    <img
      alt={alt}
      src={SIZE_640}
    />
  </picture>