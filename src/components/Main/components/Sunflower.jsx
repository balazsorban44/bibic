import React, {Component} from 'react'
import { CERTS_REF } from '../../../lib/firebase';


export default class Sunflower extends Component {

  state = {
    certificates: null
  }

  componentDidMount() {
    CERTS_REF.on("value", snap => {
      this.setState({certificates: snap.val()})
    })
  }

  render() {
    const {certificates} = this.state
    return (
      <section id="napraforgo">
        <p>Vendégházaink <b>négy napraforgós minősítés</b>sel rendelkeznek. Ez azt jelenti, hogy rendelkezünk <b>minden szobá</b>nkhoz külön <b>fürdőszobá</b>val, a házainkban felszerelt <b>konyha</b> és közösségi (<b>nappali</b>) tér van, <b>kerthelyiség</b>ünk, <b>terasz</b>unk bútorozott és zárt <b>parkoló</b>t tartunk fenn vendégeink számára, valamint házunk megfelel a FATOSZ által elvárt minősítési követelményeknek.</p>
        <div className="certificates">
          {certificates  && Object.keys(certificates).map(certificate => {
            return <img key={certificate} alt={certificates[certificate].name} className="certificate" src={certificates[certificate].resized} />
          })}
        </div>
      </section>
    )
  }
}
