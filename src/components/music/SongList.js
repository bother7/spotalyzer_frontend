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
  }

componentDidMount(){
  if (this.props.username !== "" && localStorage.getItem('jwt_token') !== null) {
    this.props.getRecent()
  }
}

mapSongs = (array) => {
    return array.map((row, index) => {return (<tr key={index}><td draggable="true" data-uri={row.uri}>{row.title}</td><td>{row.artist}</td><td><button onClick={this.handlePlay} data-uri={row.uri}>Play Song</button></td><td><button onClick={this.handleAddtoPlaylist} data-id={row.id}>Add to Playlist</button></td></tr>)})
  }

  render () {
    if (this.props.container === "welcome") {
      if (this.props.recentlyPlayed !== []) {
        var tablerows = this.mapSongs(this.props.recentlyPlayed)
      } else {
        var tablerows = null
      }
      return (<table className="songTable">{tablerows}</table>)
    } else if (this.props.container === "search"){
        if (this.props.searchResults !== []) {
          var tablerows = this.mapSongs(this.props.searchResults)
        } else {
          var tablerows = null
        }
        return (<table className="songTable">{tablerows}</table>)
      }
      else if (this.props.container === "playlist") {
        if (this.props.currentPlaylistSongs !== []) {
          var tablerows = this.mapSongs(this.props.currentPlaylistSongs)
        } else {
          var tablerows = null
        }
        return (<table className="songTable">{tablerows}</table>)
      }
      else {
        return (<div></div>)
      }
    }


}

function mapStateToProps(state) {
  return {
    recentlyPlayed: state.songs.recentlyPlayed,
    searchResults: state.songs.searchResults,
    container: state.songs.container,
    username: state.users.username,
    currentPlaylistSongs: state.playlists.currentPlaylistSongs
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
