import React, {createContext, useContext, useCallback} from 'react'
import {useData} from './useData'
import {FS} from 'lib/firebase'


const ParagraphContext = createContext()


export const useParagraph = () => useContext(ParagraphContext)


const PARAGRAPHS_QUERY = FS
  .collection("translations")
  .where("type", "==", "paragraph")
  .orderBy("order")


export const ParagraphProvider = ({children}) => {

  const [paragraphs, loading] = useData(PARAGRAPHS_QUERY)

  const getParagraphs = useCallback((section) => {
    return paragraphs.filter(paragraph => paragraph.section === section)
  }, [paragraphs])

  return (
    <ParagraphContext.Provider value={{getParagraphs, loading}}>
      {children}
    </ParagraphContext.Provider>
  )
}