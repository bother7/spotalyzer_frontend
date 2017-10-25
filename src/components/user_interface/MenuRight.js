import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'

class MenuRight extends React.Component {

  state = {
    playlistName: ""
  }

  componentDidMount (){
    if (this.props.username !== "" && this.props.isAuthorized) {
      this.props.getPlaylists()
    }
  }

  handleCreatePlaylist = (event) => {
    event.preventDefault()
    this.props.createPlaylist(this.state.playlistName)
  }

  handlePlayPlaylist = (event) => {
    event.preventDefault()
    this.props.playCurrentPlaylist(this.props.currentPlaylist)
    this.props.history.push(`/playlists/${this.props.currentPlaylist}`)
  }

  handleKeyUp = (event) => {
    event.preventDefault()
    this.setState({playlistName: event.target.value})
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.deletePlaylist(this.props.currentPlaylist)
  }

  moveUp = (event) => {
    event.preventDefault()
    let position = this.props.currentPlaylistSongs.findIndex(song => song.id.toString() === event.target.dataset.id)
    let new_arr = this.props.currentPlaylistSongs
    let temp = new_arr[position]
    new_arr[position] = new_arr[position-1]
    new_arr[position-1] = temp
    this.props.tweakPlaylist([])
    this.props.tweakPlaylist(new_arr)
  }

  moveDown = (event) => {
    event.preventDefault()
    let position = this.props.currentPlaylistSongs.findIndex(song => song.id.toString() === event.target.dataset.id)
    let new_arr = this.props.currentPlaylistSongs
    let temp = new_arr[position]
    new_arr[position] = new_arr[position+1]
    new_arr[position+1] = temp
    this.props.tweakPlaylist([])
    this.props.tweakPlaylist(new_arr)
  }

  removeSongFromPlaylist = (event) => {
    event.preventDefault()
    let new_arr = this.props.currentPlaylistSongs.filter(song => song.id.toString() !== event.target.dataset.id)
    this.props.tweakPlaylist(new_arr)
  }

  removeSongFromSaved = (event) => {
    event.preventDefault()
    let new_arr = this.props.savedSongs.filter(song => song.id.toString() !== event.target.dataset.id)
    this.props.updateSavedSongs(new_arr)
  }

  updatePlaylist = (event) => {
    event.preventDefault()
    let badSongs = this.props.currentPlaylistSongs.find(song => song.uri === "song unavailable")
    if (badSongs) {
      if (badSongs.length > 1) {
        badSongs = badSongs.map(song => song.title)
        badSongs = badSongs.join(', ')
      } else {
        badSongs = badSongs.title
      }
      alert(`Playlist can't be updated because Spotify doesn't currently have ${badSongs}`)
    } else {
      this.props.updatePlaylist(this.props.currentPlaylist, this.props.currentPlaylistSongs)
    }
  }

  handleOption = (event) => {
    event.preventDefault()
    this.props.newCurrentPlaylist(event.target.value)
  }


  playlistOptions = () => {
    if (this.props.recentPlaylists.length > 0) {
      var list = this.props.recentPlaylists.map((playlist) => {
        return (<option value={playlist.id}>{playlist.name}</option>)
      })
      return (<select className="bigSelect" onChange={this.handleOption} value={this.props.currentPlaylist}><option value="" disabled>select a playlist</option>{list}</select>)
    } else {
      return (<select className="bigSelect" onChange={this.handleOption} value={this.props.currentPlaylist}><option value="" disabled>no playlists to choose from</option></select>)
    }
  }

  handleAddToPlaylist = (event) => {
    event.preventDefault()
    if (this.props.savedSongs.length > 0) {
      let addSong = this.props.savedSongs.find(song => song.id.toString() === event.target.dataset.id)
      let tweaked_playlist = [...this.props.currentPlaylistSongs, addSong]
      this.props.tweakPlaylist(tweaked_playlist)
    }
  }

  playlistSongs = () => {
    if (this.props.currentPlaylistSongs.length > 0) {
      let array = this.props.currentPlaylistSongs.map((song, index) => {
        if (index === 0) {
          return (<ul className="listSmall" style={{marginLeft: "5px"}}>{song.title.toLowerCase()} <br></br> <button className="defButton" onClick={this.removeSongFromPlaylist} data-id={song.id}>X</button><button className="defButton" data-id={song.id} onClick={this.moveDown}>↓</button></ul>)

        } else if (index === this.props.currentPlaylistSongs.length - 1) {
          return (<ul className="listSmall" style={{marginLeft: "5px"}}>{song.title.toLowerCase()} <br></br> <button className="defButton" onClick={this.removeSongFromPlaylist} data-id={song.id}>X</button><button className="defButton" data-id={song.id} onClick={this.moveUp}>↑</button></ul>)

        } else {
          return (<ul className="listSmall" style={{marginLeft: "5px"}}>{song.title.toLowerCase()} <br></br> <button className="defButton" onClick={this.removeSongFromPlaylist} data-id={song.id}>X</button><button className="defButton" data-id={song.id} onClick={this.moveUp}>↑</button><button className="defButton" data-id={song.id} onClick={this.moveDown}>↓</button></ul>)
        }
      })
      return array
    }
  }

  showSavedSongs = () => {
    if (this.props.savedSongs.length > 0) {
      let array = this.props.savedSongs.map((song) => {
        return (<ul className="listSmall" style={{marginLeft: "5px"}}>{song.title.toLowerCase()}: {song.artist.toLowerCase()}<br></br> <button className="defButton" onClick={this.removeSongFromSaved} data-id={song.id}>X</button><button className="defButton" onClick={this.handleAddToPlaylist} data-id={song.id}>add to playlist</button></ul>)
      })
      return array
    }
  }

  showRemove = () => {
    if (this.props.currentPlaylist !== "") {
      return (<button className="defButton" style={{marginLeft: "5px"}} onClick={this.handleDelete} >remove current playlist</button>)
    }
  }
  showPlay = () => {
    if (this.props.currentPlaylist !== "") {
      return (<button className="defButton" style={{marginLeft: "5px"}} onClick={this.handlePlayPlaylist} >play current playlist</button>)
    }
  }
  showUpdate = () => {
    if (this.props.currentPlaylist !== "") {
      return (<button className="defButton" style={{marginLeft: "5px"}} onClick={this.updatePlaylist} >update playlist</button>)
    }
  }

  render () {
    return (<div className="menuright">
      <div className="playlists">
        <form onSubmit={this.handleCreatePlaylist}>
        <input type="text" placeholder="playlist name..." onKeyUp={this.handleKeyUp}></input>
        <button type="submit" className="defButton" >create playlist</button>
        </form>
        <p className="title">playlists</p>
      {this.playlistOptions()}<br></br>
    {this.showRemove()}
    {this.showPlay()}
    {this.playlistSongs()}
    {this.showUpdate()}
      </div>
      <div className="saved">
        <p className="title" style={{marginTop: "15px"}}>saved songs</p>
        {this.showSavedSongs()}
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    recentPlaylists: state.playlists.recentPlaylists,
    currentPlaylist: state.playlists.currentPlaylist,
    username: state.users.username,
    isAuthorized: state.users.isAuthorized,
    currentPlaylistSongs: state.playlists.currentPlaylistSongs,
    savedSongs: state.playlists.savedSongs
  }
}


export default connect(mapStateToProps, actions)(MenuRight)
