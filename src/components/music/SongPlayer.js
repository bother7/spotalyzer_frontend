import React from 'react';
import {connect} from 'react-redux'


class SongContainer extends React.Component {


  componentDidMount(){
    this.refs.myIframe.onload = () => {
      console.log(this.refs.myIframe)
    }
  }




  render () {
    var uri = "https://open.spotify.com/embed?uri=" + this.props.uri + "&theme=white"
    return (<iframe className="player" title="spotify" src={uri} ref="myIframe" width="100%" height="80px" frameBorder="0" allowTransparency="true"></iframe>)
  }


}

function mapStateToProps(state) {
  return {
    uri: state.songs.uri
  }
}



export default connect(mapStateToProps, null)(SongContainer)
