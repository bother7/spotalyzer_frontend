import React from 'react';
import {connect} from 'react-redux'
// import {helper} from '../data/SpotifyWebHelper'

// console.log(helper.getCsrfToken())
// debugger
// helper.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC');


class SongContainer extends React.Component {

  // handleClick = (event) => {
  //   event.preventDefault()
  //   console.log(helper.status)
  //   helper.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC');
  // }
  componentDidMount(){
    // helper.getCsrfToken()
    this.refs.myIframe.onload = () => {
      console.log(this.refs.myIframe)
    }
  }
  // <iframe className="player" src="https://open.spotify.com/embed?uri=spotify:track:5XCJndUuktaxfVruAek3mT&theme=white" ref="myIframe" width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>

  render () {
    var uri = "https://open.spotify.com/embed?uri=" + this.props.uri + "&theme=white"
    return (<iframe className="player" src={uri} ref="myIframe" width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>)
  }

}

function mapStateToProps(state) {
  return {
    uri: state.songs.uri
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
