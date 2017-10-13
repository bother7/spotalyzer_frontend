import React from 'react';
import {Spotilocal} from '../data/spotilocal';

// const spotilocal = new Spotilocal();
// const trackUri = 'spotify:track:3cANM3NuUjRDTi8fdU8P6q';
// spotilocal.init().then((spotilocal) => {
//     return spotilocal.play(trackUri, 'spotify:user:shyyko.serhiy:playlist:4SdN0Re3tJg9uG08z2Gkr1')
// }).then((status) => {
//     console.log(`Playing:   ${status.playing}`);
//     console.log(`Song Name: ${status.track.track_resource.name}`);
//     return spotilocal.pause(true);
// }).catch(console.error);


export default class SongContainer extends React.Component {
  componentDidMount(){
    // this.refs.myIframe.onload = () => {
    //   console.log(this.refs.myIframe)
    // }
  }
  // <iframe className="player" src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" ref="myIframe" width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>

  render () {
    return (
      <iframe width="182" height="267" frameborder="0" src="http://cdn.last.fm/customisation/2008_moto/explorewidget/en.html" />
    );
  }

}
