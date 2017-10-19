import React from 'react'
// import {connect} from 'react-redux'
// import {setSearchFilter} from '../../actions/index'


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

  // componentDidMount(){
  //   fetch("http://127.0.0.1:4380/service/version.json?service=remote", {
  //     method: 'GET',
  //     headers: {
  //       'Origin': 'https://open.spotify.com',
  //       'Access-Control-Allow-Origin':'*'
  //     },
  //     mode: 'no-cors'
  //   }).then(response => response.json())
  //   .then(json => {debugger})
  //
  // }
  render () {
    return (<div className="menuleft">
    <form onSubmit={this.handleSubmit}>
    <input type="text" placeholder="Type Search Here" onKeyUp={this.handleKey}/>
    <select onChange={this.handleOption} value={this.state.localSearchFilter}>
    <option value="track">Track</option>
    <option value="playlist">Playlist</option>
    </select>
    <button type="submit">Search</button>
    </form>

    </div>)
  }


}




export default MenuLeft
