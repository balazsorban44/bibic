// import React from 'react'
// import {useTranslation} from 'react-i18next'
// import Carousel from 'components/Carousel'

// const Events = ({events}) => {
//   const [t] = useTranslation()
//   return (
//     <Carousel
//       className="events"
//       data={events}
//       itemClassName="event"
//       title={t("events.title")}
//     />
//   )
// }

// export default Events


// /** @type {import('next').GetStaticProps} */
// export const getStaticProps = async () => {
//   const firebase = await import('firebase/app')
//   await import("firebase/firestore")
//   const {config} = await import('utils/env')
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config.firebase.initConfig)
//   }
//   const FS = firebase.firestore()
//   const {flattenDocs} = await import("utils/firebase")
//   const {docs} = await FS
//     .collection("galleries")
//     .where("section", "==", "events")
//     .orderBy("order")
//     .get()

//   const events = docs.map(flattenDocs)

//   return ({
//     props: {
//       events
//     }
//   })
// }
export default () => "Events"