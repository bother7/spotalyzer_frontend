import React from 'react';
import {connect} from 'react-redux'
import {fetchRecent, playSong, addToPlaylist, playCurrentPlaylist, newCurrentPlaylist, tweakPlaylist} from '../../actions/index'

class Welcome extends React.Component {

  handlePlay = (event) => {
    event.preventDefault()
    this.props.playSong(event.target.dataset.uri)
    this.props.history.push(`/songs/${event.target.dataset.id}`)
  }

  handleAddtoPlaylist = (event) => {
    event.preventDefault()
    console.log(event.target.dataset.id)
    if (this.props.container === "welcome") {
      var origin_array = this.props.recentlyPlayed
    } else if (this.props.container === 'playlist') {
      var origin_array = this.props.fixedPlaylistSongs
    } else if (this.props.container === 'search') {
      var origin_array = this.props.searchResults
    }
    if (origin_array) {
      let addSong = origin_array.find(song => song.id.toString() === event.target.dataset.id)
      let tweaked_playlist = [...this.props.currentPlaylistSongs, addSong]
      this.props.tweakPlaylist(tweaked_playlist)
    }
  }

componentDidMount(){
  if (this.props.username !== "" && localStorage.getItem('jwt_token') !== null) {
    this.props.getRecent()
  }
}

componentWillReceiveProps(nextProps){
  if (this.props.recentPlaylists !== nextProps.recentPlaylists){
    if (this.props.history.location.pathname.startsWith("/playlists/") && (this.props.currentPlaylist === "")){
      const id = this.props.history.location.pathname.split("/playlists/")[1]
      if (nextProps.recentPlaylists.find(playlist => playlist.id.toString() === id)){
        this.props.newCurrentPlaylist(id.toString())
      }
    }
  }
  if (this.props.history.location.pathname.startsWith("/playlists/") && (this.props.currentPlaylistSongs !== nextProps.currentPlaylistSongs) && (this.props.fixedPlaylistSongs.length === 0)){
    this.props.playCurrentPlaylist(this.props.currentPlaylist)
  }
}

  mapSongs = (array) => {
    return array.map((row, index) => {return (<tr key={index}><td draggable="true"  data-uri={row.uri}>{row.title}</td><td>{row.artist}</td><td><button onClick={this.handlePlay} data-id={row.id} data-uri={row.uri}>Play Song</button></td><td><button onClick={this.handleAddtoPlaylist} data-id={row.id}>Add to Playlist</button></td></tr>)})
  }

  render () {
    if (this.props.container === "welcome") {
      if (this.props.recentlyPlayed.length > 0) {
        var tablerows = this.mapSongs(this.props.recentlyPlayed)
      } else {
        var tablerows = null
      }
      return (<table className="songTable">{tablerows}</table>)
    } else if (this.props.container === "search"){
        if (this.props.searchResults.length > 0) {
          var tablerows = this.mapSongs(this.props.searchResults)
        } else {
          var tablerows = null
        }
        return (<table className="songTable">{tablerows}</table>)
      }
      else if (this.props.container === "playlist") {
        if (this.props.fixedPlaylistSongs.length > 0) {
          var tablerows = this.mapSongs(this.props.fixedPlaylistSongs)
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
    fixedPlaylistSongs: state.playlists.fixedPlaylistSongs,
    recentPlaylists: state.playlists.recentPlaylists,
    currentPlaylist: state.playlists.currentPlaylist,
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
    },
    playCurrentPlaylist: (id) => {
      dispatch(playCurrentPlaylist(id))
    },
    newCurrentPlaylist: (id) => {
      dispatch(newCurrentPlaylist(id))
    },
    tweakPlaylist: (array) => {
      dispatch(tweakPlaylist(array))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
