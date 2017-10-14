import React from 'react'
import {connect} from 'react-redux'
import {searchTerm} from '../../actions/index'

class MenuLeft extends React.Component {
  state = {
    search: "",
    searchFilter: "track"
  }
  handleKey = (event) => {
    this.setState({search: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.searchSpotify(this.state.search, this.state.searchFilter)
  }
  handleOption = (event) => {
    event.preventDefault()
    this.setState({searchFilter: event.target.value})
  }
  render () {
    return (<div className="menuleft">
    <form onSubmit={this.handleSubmit}>
    <input type="text" placeholder="Type Search Here" onKeyUp={this.handleKey}/>
    <select onChange={this.handleOption} value={this.state.searchFilter}>
    <option value="track">Track</option>
    <option value="artist">Artist</option>
    <option value="playlist">Playlist</option>
    </select>
    <button type="submit">Search</button>
    </form>
    <br></br>
    Basic Menu <br></br>
    Stuff goes here <br></br>
    browse? <br></br>
    Spotify???? <br></br>
    PROFESSIONAL salkfalskgjs
    </div>)
  }


}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchSpotify: (searchString, searchFilter) => {
      dispatch(searchTerm(searchString, searchFilter))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft)
