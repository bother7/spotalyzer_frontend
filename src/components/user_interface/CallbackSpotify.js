import React from 'react'
import {env_url} from '../data/environment'
import {connect} from 'react-redux'
import {authorizeUser, loginUser} from '../../actions/index'


class CallbackSpotify extends React.Component {

  componentDidMount(){
    var code = this.props.location.search
      if (code.startsWith("?code=")) {
        code = code.slice(6)
        fetch(`${env_url}/spotifyauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          user_id: localStorage.getItem("user_id")
        })
      }).then(response => response.json())
      .then(json => {
        this.props.handleLogin(json.name, json.id)
        this.props.handleAuthorize()
        this.props.history.push("/")
      })
      }
  }

  render() {
    console.log("callback reached")
    return (<div className="authorize">callback station</div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAuthorize: () => {
      dispatch(authorizeUser())
    },
    handleLogin: (name, user_id) => {
      dispatch(loginUser(name, user_id))
    }
  }
}


export default connect(null, mapDispatchToProps)(CallbackSpotify)
