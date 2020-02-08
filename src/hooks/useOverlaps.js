import {useEffect, useState} from "react"

import {useNotification} from "hooks"

import {eachDayOfInterval, endOfDay, subDays} from "date-fns"


const useOverlaps = roomId => {
  const [overlaps, setOverlaps] = useState([])
  const notify = useNotification()

  useEffect(() => {
    (async () => {
      try {
        if (roomId) {
          const url = `${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/getOverlaps?roomId=${roomId}`
          const data = await (await fetch(url)).json()
          const overlaps = data
            .flatMap(({start, end}) => eachDayOfInterval({
              start: new Date(start),
              end: endOfDay(subDays(new Date(end), 1))
            }))
          setOverlaps(overlaps)
        }
      } catch (error) {
        console.error(error)
        notify("error", "fetch-overlaps", {message: error.message})
      }
    })()
  }, [notify, roomId])

  return overlaps
}


export default useOverlaps