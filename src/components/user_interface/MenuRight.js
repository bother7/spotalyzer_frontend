import React from 'react'
import {connect} from 'react-redux'
import { getPlaylists, createPlaylist, deletePlaylist, newCurrentPlaylist} from '../../actions/index'

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


  handleKeyUp = (event) => {
    event.preventDefault()
    this.setState({playlistName: event.target.value})
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.deletePlaylist(event.target.dataset.id)
  }

  handleOption = (event) => {
    event.preventDefault()
    this.props.newCurrentPlaylist(event.target.value)
  }

  playlistOptions = () => {
    if (this.props.recentPlaylists !== []) {
      var list = this.props.recentPlaylists.map((playlist) => {
        return (<option value={playlist.id}>{playlist.name}</option>)
      })
      return (<select onChange={this.handleOption} value={this.props.currentPlaylist}>{list}</select>)
    }
  }

  playlistSongs = () => {
    if (this.props.currentPlaylistSongs !== []) {
      var array = this.props.currentPlaylistSongs.map((song) => {
        return (<li>{song.title}</li>)
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
    {this.playlistSongs()}
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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuRight)
