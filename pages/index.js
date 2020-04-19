import IndexMenu from 'components/IndexMenu'
import Hero from 'components/Hero'
import Introduction from 'components/Introduction'
import Facilities from 'components/Facilities'
import Rooms from "components/Rooms"
import Prices from 'components/Prices'
import Map from "components/Map"
import Section from "components/section"

// TODO: Use Sanity or Firebase
import introductionData from "data/introduction.json"
import sunflowerData from "data/sunflower.json"
import facilitiesData from "data/facilities.json"
import roomsData from "data/rooms.json"
import feedbacksData from "data/feedbacks.json"
import roomFacilitiesData from "data/roomFacilities.json"

const Index = ({introduction, facilities, rooms, feedbacks}) => {
  return (
    <>
      <IndexMenu rooms={rooms}/>
      <Hero/>
      <Section className="introduction" id="bemutatkozas" title={"Üdvözöljük"}>
        <Introduction {...introduction}/>
      </Section>
      <Section
        className="facilities-section"
        id="szolgaltatasok"
        title={"Szolgáltatások"}
      >
        <Facilities {...facilities}/>
      </Section>
      <Section
        className="rooms-section"
        id="szobak"
        title={<>Szobák <span>(Flóra ház)</span></>}
      >
        <Rooms rooms={rooms}/>
      </Section>
      <Section
        className="prices-section"
        id="arak"
        title={"Árak"}
      >
        <Prices/>
      </Section>
      <Map/>
    </>
  )
}

export default Index


export const getStaticProps = async () => {
  return ({
    props: {
      introduction: {
        ...introductionData,
        sunflower: sunflowerData
      },
      facilities: {
        ...facilitiesData,
        images: facilitiesData.images.slice(0, 3)
      },
      rooms: roomsData.map(room => {
        room.facilities = Object.entries(roomFacilitiesData)
          .filter(([_, {inRoom}]) => Object.values(inRoom).includes(room.id))
        room.pictures = room.pictures.sort((a, b) => a.order - b.order)
        return room
      }),
      feedbacks: {
        feedbacks: feedbacksData
          .filter(({content, accepted}) => accepted && !/^\*{1,5}$/.test(content)),
        allAvg: 5,
        rooms: [
          {
            roomId: 1,
            avg: 3.4
          }
        ]
      }
    }
  })
}
