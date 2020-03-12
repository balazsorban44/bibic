import React from 'react'
import {Loading} from './Elements'
import {useGallery} from 'context/gallery'
import {useTranslation} from 'react-i18next'

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

  const {i18n: {language}} = useTranslation()
  const alt = title?.[language] ?? desc?.[language]

  if (desc) {
    return (
      <div className="gallery-item">
        <div className="img-wrapper">
          <GalleryImage
            alt={alt}
            sizes={sizes}
          />
        </div>
        <h3>{title[language]}</h3>
        <p>{desc[language]}</p>
      </div>
    )
  }

  return (
    <GalleryImage alt={alt} sizes={sizes} />
  )
}


export const GalleryImage = ({sizes, alt}) => {
  return (
    <picture>
      <source media="(min-width: 540px)" srcSet={sizes.SIZE_1024}/>
      <source media="(min-width: 1280px)" srcSet={sizes.SIZE_1440}/>
      <img alt={alt} src={sizes.SIZE_640} />
    </picture>
  )
}