import React from 'react'
import {Loading} from './Elements'
import {useGallery} from 'context/gallery'

export const Gallery = ({count, section}) => {

  const {getGallery, loading} = useGallery()

  if (loading) {
    return (
      <div className="gallery">
        <Loading/>
      </div>
    )
  }

  const gallery = getGallery(section, count)

  return (
    <div className="gallery">
      { gallery.map(item => <GalleryItem {...item} /> ) }
    </div>
  )
}


export default Gallery


export const GalleryItem = ({SIZE_1024, SIZE_1440, SIZE_640, desc, title}) => {

  const sizes = {
    SIZE_640,
    SIZE_1024,
    SIZE_1440
  }

  if (desc) {
    return (
      <div className="gallery-item">
        <div className="img-wrapper">
          <GalleryImage
            alt={desc}
            sizes={sizes}
          />
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    )
  }

  return (
    <GalleryImage alt={title} sizes={sizes} />
  )
}


export const GalleryImage = ({sizes, alt}) => {
  return (
    <picture>
      <source
        media="(min-width: 540px)"
        srcSet={sizes.SIZE_1024}
      />
      <source
        media="(min-width: 1280px)"
        srcSet={sizes.SIZE_1440}
      />
      <img
        alt={alt}
        src={sizes.SIZE_640}
      />
    </picture>
  )
}