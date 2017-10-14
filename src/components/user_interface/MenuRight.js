import React from 'react'
import {connect} from 'react-redux'
import {getPlaylists, createPlaylist} from '../../actions/index'

class MenuRight extends React.Component {



  componentDidMount () {
    this.props.getPlaylists()
  }

  handleCreatePlaylist = (event) => {
    event.preventDefault()
    console.log('clicked create playlist')
  }




  render () {
    return (<div className="menuright">
      <div className="playlists">
      <h3>playlist stuff here</h3>
      <form onSubmit={this.handleCreatePlaylist}>
      <input type="text" placeholder="Create Playlist Name"></input>
      <button type="submit">Create Playlist</button>
      </form>

      </div>
      <div className="saved">
      <h3>saved stuff here</h3>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylists: () => {
      dispatch(getPlaylists())
    },
    createNewPlaylist: (name) => {
      dispatch(createPlaylist(name))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuRight)
