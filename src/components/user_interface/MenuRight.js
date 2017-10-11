import React from 'react'
import {connect} from 'react-redux'
import {searchTerm} from '../../actions/index'

class MenuRight extends React.Component {

  state = {
    search: ""
  }

  handleKey = (event) => {
    this.setState({search: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.searchSpotify(this.state.search)
  }

  render () {
    return (<div> <form onSubmit={this.handleSubmit}><input type="text" onKeyUp={this.handleKey}/><button type="submit">Search</button></form>
      right menu</div>)
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchSpotify: (searchString) => {
      dispatch(searchTerm(searchString))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuRight)
