import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class MenuLeft extends React.Component {
  state = {
    search: "",
    localSearchFilter: "track"
  }

  handlePlay = (event) => {
    event.preventDefault()
    if (event.target.dataset.uri === "song unavailable"){
      alert("song is unavailable on spotify")
    } else {
      this.props.playSong(event.target.dataset.uri)
      this.props.getSongAnalysis(event.target.dataset.id)
      this.props.history.push(`/songs/${event.target.dataset.id}`)
    }
  }

  handleAddtoSaved = (event) => {
    event.preventDefault()
    if (this.props.recommendation.length > 0) {
      let addSong = this.props.recommendation.find(song => song.id.toString() === event.target.dataset.id)
      let tweaked_playlist = [...this.props.savedSongs, addSong]
      this.props.updateSavedSongs(tweaked_playlist)
    }
  }

  handleKey = (event) => {
    this.setState({search: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.history.push(`/search&q=${this.state.search}&filter=${this.state.localSearchFilter}`)
  }
  handleOption = (event) => {
    event.preventDefault()
    this.setState({localSearchFilter: event.target.value})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.recommendation.length > 1) {
      return true
    } else {
      return false
    }
  }

  mapRecommendations = () => {
    const centerStyle = {display: "block", margin: "auto"}
    if (this.props.recommendation.length > 0) {
    return this.props.recommendation.map((song) => {
      return (<div><ul className="listSmall" style={centerStyle}>{song.title}</ul><img style={centerStyle} src={song.artwork_url}/><button className="defButton" onClick={this.handlePlay} data-id={song.id} data-uri={song.uri}>Play</button><button className="defButton" onClick={this.handleAddtoSaved} data-id={song.id}>Save</button></div>)
      })
    }

  }
  render () {
    return (<div className="menuleft">
    <form onSubmit={this.handleSubmit}>
    <input type="text" placeholder="Search..." onKeyUp={this.handleKey}/>
    <select onChange={this.handleOption} value={this.state.localSearchFilter}>
    <option value="track">Track</option>
    <option value="playlist">Playlist</option>
    </select>
    <button className="defButton" type="submit">Search</button>
    </form>
    Songs for You <br></br>
    {this.mapRecommendations()}
    </div>)
  }


}

function mapStateToProps(state) {
  return {
    savedSongs: state.playlists.savedSongs,
    recommendation: state.songs.recommendation
  }
}


export default connect(mapStateToProps,actions)(MenuLeft)
