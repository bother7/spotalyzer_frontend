import React from 'react'
import {env_url} from '../data/environment'
import {connect} from 'react-redux'
import {authorizeUser, loginUser, getPlaylists, getSaved} from '../../actions/index'


class CallbackSpotify extends React.Component {

  componentDidMount(){
    var code = this.props.location.search
      if (code.startsWith("?code=")) {
        code = code.slice(6)
        fetch(`${env_url}/spotifyauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
        },
        body: JSON.stringify({
          code: code
        })
      }).then(response => response.json())
      .then(json => {
        // this.props.trickleLogin(json.name, json.id, localStorage.getItem("jwt_token"))
        this.props.handleLogin(json.name, json.id, localStorage.getItem("jwt_token"))
        this.props.handleAuthorize()

        setTimeout(function(){ this.props.history.push("/") }, 1000).bind(this)
      })
      }
  }

  render() {
    return (<div className="center">Authorize Denied</div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAuthorize: () => {
      dispatch(authorizeUser())
    },
    handleLogin: (name, user_id, jwt_token) => {
      dispatch(loginUser(name, user_id, jwt_token))
    },
    getPlaylists: () => {
      dispatch(getPlaylists())
    },
    getSaved: () => {
      dispatch(getSaved())
    },
    goHome: () => {
      dispatch(goHome())
    }
  }
}


export default connect(null, mapDispatchToProps)(CallbackSpotify)
