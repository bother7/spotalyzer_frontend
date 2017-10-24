import React from 'react'
import {connect} from 'react-redux'


class MenuLeft extends React.Component {
  state = {
    search: "",
    localSearchFilter: "track"
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

  mapRecommendations = () => {
    
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

    </div>)
  }


}

function mapStateToProps(state) {
  return {
    recommendation: state.songs.recommendation
  }
}


export default connect(mapStateToProps)(MenuLeft)
