import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import "lib/i18n"
import {NotificationProvider} from 'lib/notification'
import 'react-toastify/dist/ReactToastify.css'

import './sass/main.sass'
import Database from 'components/db'
import App from 'components/App'
import {ParagraphProvider} from 'context/paragraph'
import {GalleryProvider} from 'context/gallery'
import {RoomFacilitiesProvider} from 'context/roomFacilities'

render(
  <BrowserRouter>
    <NotificationProvider>
      <Database>
        <ParagraphProvider>
          <GalleryProvider>
            <RoomFacilitiesProvider>
              <App/>
            </RoomFacilitiesProvider>
          </GalleryProvider>
        </ParagraphProvider>
      </Database>
    </NotificationProvider>
  </BrowserRouter>,
  document.querySelector('.app')
)
