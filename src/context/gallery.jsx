import React, {createContext, useContext, useCallback} from 'react'
import {useData} from './useData'
import {FS} from 'lib/firebase'


const GalleryContext = createContext()


export const useGallery = () => useContext(GalleryContext)


const GALLERIES_QUERY = FS
  .collection("gallery")
  .orderBy("order")


export const GalleryProvider = ({children}) => {

  const [result, loading] = useData(GALLERIES_QUERY)

  const getGallery = useCallback((section, count) => {
    const gallery = result.filter(item => item.section === section)
    if (count) {
      return gallery.slice(0, count)
    } else {
      return gallery
    }
  }, [result])

  return (
    <GalleryContext.Provider value={{getGallery, loading}}>
      {children}
    </GalleryContext.Provider>
  )
}