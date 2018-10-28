import React from "react"
import {
  configure, mount, shallow
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})
import moment from "./lib/moment"
import fetch from "jest-fetch-mock"
import firebasemock from 'firebase-mock'


const mockauth = new firebasemock.MockAuthentication()
const mockdatabase = new firebasemock.MockFirebase()
const mockfirestore = new firebasemock.MockFirestore()
const mockstorage = new firebasemock.MockStorage()
const mockmessaging = new firebasemock.MockMessaging()

const firebase = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => path ? mockdatabase.child(path) : mockdatabase,
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
  // use null if your code does not use STORAGE
  () => mockstorage,
  // use null if your code does not use MESSAGING
  () => mockmessaging
)


/**
 * make these available without needing to import them every time in tests
 * @see https://youtu.be/uo0psyTxgQM?t=903
 */
global.React = React
global.mount = mount
global.shallow = shallow
global.moment = moment
global.fetch = fetch
global.mockFirebase = firebase