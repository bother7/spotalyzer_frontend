import React from 'react'
import {connect} from 'react-redux'

class AuthRequired extends React.Component {



  render() {
    return (<h1>User must <a href="/authorize">Authorize</a> App with Spotify before Continuing</h1>)
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(null, mapDispatchToProps)(AuthRequired)
