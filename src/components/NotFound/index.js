import React from 'react'
import {Link} from "react-router-dom"

import "./not-found.sass"

export default () =>
  <div className="not-found">
    <h2>
    404
    </h2>
    <p>
    Hmm... Ez az oldal sajnos üres.
    </p>
    <Link to ="/">Vissza a főoldalra</Link>
  </div>

