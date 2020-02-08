import React from "react"
import Text from "../ui/Text"

export const GalleryImage = ({sizes: {SIZE_640, SIZE_1024, SIZE_1440}, alt}) =>
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

export const GalleryItem = ({SIZE_1024, SIZE_1440, SIZE_640, desc, title, fileName}) =>
  desc
    ? (
      <div className="gallery-item">
        <div className="img-wrapper">
          <GalleryImage
            alt={desc || fileName}
            sizes={{
              SIZE_640,
              SIZE_1024,
              SIZE_1440
            }}
          />
        </div>
        <Text component="h3">{title}</Text>
        <Text component="p">{desc}</Text>
      </div>
      )
    : (
      <GalleryImage
        alt={title || fileName}
        sizes={{
          SIZE_640,
          SIZE_1024,
          SIZE_1440
        }}
      />
    )
