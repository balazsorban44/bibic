import data from "./data.json"
import {FS} from "lib/firebase.js"

export const run = (collection, section) => () => {
  Object.values(data).forEach(async (item, order) => {
    try {
      const data = {
        order,
        ...item,
        section
      }
      const key = await FS.collection(collection).add(data)
      // eslint-disable-next-line no-console
      console.log("added", key.id)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  })
}