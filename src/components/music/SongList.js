import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Welcome extends React.Component {

  handlePlay = (event) => {
    event.preventDefault()
    this.props.playSong(event.target.dataset.uri)
    this.props.history.push(`/songs/${event.target.dataset.id}`)
  }

  targetArray = () => {
    let origin_array
    if (this.props.container === "welcome") {
      origin_array = this.props.recentlyPlayed
    } else if (this.props.container === 'playlist') {
      origin_array = this.props.fixedPlaylistSongs
    } else if (this.props.container === 'search') {
      origin_array = this.props.searchResults
    }
    return origin_array
  }

  handleAddtoPlaylist = (event) => {
    event.preventDefault()
    let target_array = this.targetArray()
    if (target_array.length > 0) {
      let addSong = target_array.find(song => song.id.toString() === event.target.dataset.id)
      let tweaked_playlist = [...this.props.currentPlaylistSongs, addSong]
      this.props.tweakPlaylist(tweaked_playlist)
    }
  }

  handleAddtoSaved = (event) => {
    event.preventDefault()
    let target_array = this.targetArray()
    if (target_array.length > 0) {
      let addSong = target_array.find(song => song.id.toString() === event.target.dataset.id)
      let tweaked_playlist = [...this.props.savedSongs, addSong]
      this.props.updateSavedSongs(tweaked_playlist)
    }
  }

  handlePlayPlaylist = (event) => {
    event.preventDefault()
    let playlist = this.props.searchResults.find(playlist => playlist.id.toString() === event.target.dataset.id)
    this.props.playSearchPlaylist(playlist)
    this.props.history.push(`/playlists/${event.target.dataset.id}`)
  }

  handleSavePlaylist = (event) => {
    event.preventDefault()
    let playlist = this.props.searchResults.find(playlist => playlist.id.toString() === event.target.dataset.id)
    this.props.savePlaylist(playlist)
  }

componentDidMount(){
  if (this.props.username !== "" && this.props.isAuthorized && this.props.container === "welcome") {
    this.props.fetchRecent()
  }
}

componentWillReceiveProps(nextProps){
  console.log(this.props.match)
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
  if (this.props.history.location.pathname.startsWith("/search") && (this.props.searchResults.length === 0)){
    this.props.searchTerm(this.props.match.params.search, this.props.match.params.filter)
  }
  if ((this.props.match.params.search !== nextProps.match.params.search) || (this.props.match.params.filter !== nextProps.match.params.filter)){
    this.props.searchTerm(nextProps.match.params.search, nextProps.match.params.filter)
  }
}

  mapSongs = (array) => {
    return array.map((row, index) => {return (<tr key={index}><td draggable="true"  data-uri={row.uri}>{row.title}</td><td>{row.artist}</td><td><button onClick={this.handlePlay} data-id={row.id} data-uri={row.uri}>Play Song</button></td><td><button onClick={this.handleAddtoPlaylist} data-id={row.id}>Add to Playlist</button></td><td><button onClick={this.handleAddtoSaved} data-id={row.id}>Save Song</button></td></tr>)})
  }

  mapPlaylists = (array) => {
    return array.map((row, index) => {return (<tr key={index}><td draggable="true"  data-uri={row.uri}>{row.name}</td><td><button onClick={this.handlePlayPlaylist} data-id={row.id} >Play Playlist</button></td><td><button onClick={this.handleSavePlaylist} data-id={row.id}>Save Playlist</button></td></tr>)})
  }

  render () {
    console.log(this.props)
    var tablerows
    if (this.props.container === "welcome") {
      if (this.props.recentlyPlayed.length > 0) {
        tablerows = this.mapSongs(this.props.recentlyPlayed)
      } else {
        tablerows = null
      }
      return (<table className="songTable">{tablerows}</table>)
    } else if (this.props.container === "search"){
        if (this.props.searchResults.length > 0 && this.props.searchFilter === "track") {
          tablerows = this.mapSongs(this.props.searchResults)
        } else if (this.props.searchResults.length > 0 && this.props.searchFilter === "playlist"){
          tablerows = this.mapPlaylists(this.props.searchResults)
        } else {
          tablerows = null
        }
        return (<table className="songTable">{tablerows}</table>)
      }
      else if (this.props.container === "playlist") {
        if (this.props.fixedPlaylistSongs.length > 0) {
          tablerows = this.mapSongs(this.props.fixedPlaylistSongs)
        } else {
          tablerows = null
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
    isAuthorized: state.users.isAuthorized,
    fixedPlaylistSongs: state.playlists.fixedPlaylistSongs,
    recentPlaylists: state.playlists.recentPlaylists,
    currentPlaylist: state.playlists.currentPlaylist,
    currentPlaylistSongs: state.playlists.currentPlaylistSongs,
    savedSongs: state.playlists.savedSongs,
    searchFilter: state.songs.searchFilter
  }
}



export default connect(mapStateToProps, actions)(Welcome)
