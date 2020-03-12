import {addDays, startOfDay} from "date-fns"

export const TODAY = startOfDay(new Date())
export const TOMORROW = addDays(TODAY, 1)

export const routes = {
  HOME: "/",
  FEEDBACK_FORM: "/visszajelzes",
  RESERVE: "/foglalas",
  FOODS: "/etelek",
  EVENTS: "/rendezvenyek",
  MESSAGE: "/uzenet",
  FACILITIES: "/szolgaltatasok",
  ERROR: "/hiba"
}

const config = {
  "app": {
    "DOMAIN": process.env.REACT_APP_DOMAIN,
    "VERSION": process.env.REACT_APP_VERSION,
    "YEAR": new Date().getFullYear(),
    "DEFAULT_LOCALE": process.env.DEFAULT_LOCALE,
    "locales": ["hu", "en", "de"]
  },
  "firebase": {
    "initConfig": {
      "apiKey": process.env.REACT_APP_API_KEY,
      "authDomain": process.env.REACT_APP_AUTH_DOMAIN,
      "databaseURL": process.env.REACT_APP_DATABASE_URL,
      "projectId": process.env.REACT_APP_PROJECT_ID,
      "storageBucket": process.env.REACT_APP_STORAGE_BUCKET,
      "messagingSenderId": process.env.REACT_APP_MESSAGING_SENDER_ID
    },
    "CLOUD_FUNCTION_URL": process.env.REACT_APP_CLOUD_FUNCTION_URL
  },

  "googleMaps": {
    "API_KEY": process.env.REACT_APP_MAP_API_KEY,
    "URL": process.env.REACT_APP_MAP_URL,
    "zoom": parseInt(process.env.REACT_APP_MAP_ZOOM, 10),
    "center": {
      "lat": parseFloat(process.env.REACT_APP_MAP_LAT, 10),
      "lng": parseFloat(process.env.REACT_APP_MAP_LONG, 10)
    }
  },
  "contact": {
    "ADDRESS": process.env.REACT_APP_ADDRESS,
    "TEL_SHORT": process.env.REACT_APP_TEL_SHORT,
    "TEL_LONG": process.env.REACT_APP_TEL_LONG,
    "FACEBOOK_URL": process.env.REACT_APP_FACEBOOK_URL,
    "INSTAGRAM_URL": process.env.REACT_APP_INSTAGRAM_URL,
    "YOUTUBE_URL": process.env.REACT_APP_YOUTUBE_URL,
    "GERGO_BOOS_URL": process.env.REACT_APP_BOOS_GERGO_URL,
    "BALAZS_ORBAN_URL": process.env.REACT_APP_BALAZS_ORBAN_URL
  }
}

export default config