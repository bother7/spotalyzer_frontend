import React from 'react'
import {connect} from 'react-redux'
import { getPlaylists, createPlaylist, deletePlaylist, newCurrentPlaylist, playCurrentPlaylist, updatePlaylist, tweakPlaylist} from '../../actions/index'

class MenuRight extends React.Component {

  state = {
    playlistName: ""
  }

  componentDidMount () {
    if (this.props.username !== "" && this.props.isAuthorized) {
      this.props.getPlaylists()
    }
  }

  handleCreatePlaylist = (event) => {
    event.preventDefault()
    this.props.createNewPlaylist(this.state.playlistName)
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

  updatePlaylist = (event) => {
    event.preventDefault()
    this.props.updatePlaylist(this.props.currentPlaylist, this.props.currentPlaylistSongs)
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
      return (<select onChange={this.handleOption} value={this.props.currentPlaylist}><option value="" disabled>Select a Playlist</option>{list}</select>)
    } else {
      return (<select onChange={this.handleOption} value={this.props.currentPlaylist}><option value="" disabled>No Playlists to Choose From</option></select>)
    }
  }


  playlistSongs = () => {
    if (this.props.currentPlaylistSongs.length > 0) {
      let array = this.props.currentPlaylistSongs.map((song) => {
        return (<li className="listSmall">{song.title} <button onClick={this.removeSongFromPlaylist} data-id={song.id}>X</button><button data-id={song.id} onClick={this.moveUp}>↑</button><button data-id={song.id} onClick={this.moveDown}>↓</button></li>)
      })
      return array
    }
  }

  render () {
    return (<div className="menuright">
      <div className="playlists">
        <form onSubmit={this.handleCreatePlaylist}>
        <input type="text" placeholder="Create Playlist Name" onKeyUp={this.handleKeyUp}></input>
        <button type="submit">Create Playlist</button>
        </form>
      {this.playlistOptions()}<br></br>
    <button onClick={this.handleDelete}>Remove Current Playlist</button>
    <button onClick={this.handlePlayPlaylist}>Play Current Playlist</button>
    {this.playlistSongs()}
    <button onClick={this.updatePlaylist}>Update Playlist</button>
      </div>
      <div className="saved">
      saved stuff here<br></br>
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
    currentPlaylistSongs: state.playlists.currentPlaylistSongs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewPlaylist: (name) => {
      dispatch(createPlaylist(name))
    },
    deletePlaylist: (id) => {
      dispatch(deletePlaylist(id))
    },
    getPlaylists: () => {
      dispatch(getPlaylists())
    },
    newCurrentPlaylist: (id) => {
      dispatch(newCurrentPlaylist(id))
    },
    playCurrentPlaylist: (id) => {
      dispatch(playCurrentPlaylist(id))
    },
    updatePlaylist: (id, song_array) => {
      dispatch(updatePlaylist(id, song_array))
    },
    tweakPlaylist: (array) => {
      dispatch(tweakPlaylist(array))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuRight)
