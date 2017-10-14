import React from 'react';
import {connect} from 'react-redux'
import {fetchRecent, playSong, addToPlaylist} from '../../actions/index'

class Welcome extends React.Component {

  handlePlay = (event) => {
    event.preventDefault()
    this.props.playSong(event.target.dataset.uri)
  }

  handleAddtoPlaylist = (event) => {
    event.preventDefault()
    console.log(event.target.dataset.id)
    // this.props.addToPlaylist(event.target.dataset.id)
  }

componentDidMount(){
  this.props.getRecent()
}

mapSongs = (array) => {
    return array.map((row) => {return (<tr>{row.title}<td>{row.artist}</td><td><button onClick={this.handlePlay} data-uri={row.uri}>Play Song</button></td><td><button onClick={this.handleAddtoPlaylist} data-id={row.id}>Add to Playlist</button></td></tr>)})
  }

  render () {
    if (this.props.container === "welcome") {
      if (this.props.recentlyPlayed !== []) {
        var tablerows = this.mapSongs(this.props.recentlyPlayed)
      } else {
        var tablerows = null
      }
    } else {
        if (this.props.searchResults !== []) {
          var tablerows = this.mapSongs(this.props.searchResults)
        } else {
          var tablerows = null
        }
      }
    return (<table>{tablerows}</table>)
    }


}

function mapStateToProps(state) {
  return {
    recentlyPlayed: state.songs.recentlyPlayed,
    searchResults: state.songs.searchResults,
    container: state.songs.container
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecent: () => {
      dispatch(fetchRecent())
    },
    playSong: (uri) => {
      dispatch(playSong(uri))
    },
    addToPlaylist: (song_id) => {
      dispatch(addToPlaylist(song_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
