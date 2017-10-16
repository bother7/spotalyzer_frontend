import React from 'react'
import {env_url} from '../data/environment'
import {connect} from 'react-redux'
import {loginUser, isUserAuthorized} from '../../actions/index'



class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  changeName = (event) => {
    this.setState({username: event.target.value})
  }
  changePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${env_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(json => {
      this.props.handleLogin(json.name, json.id)
      localStorage.setItem("jwt_token", json.jwt_token)
      this.props.isUserAuthorized(json.id)
      this.props.history.push('/')
    })
  }

  render() {
    return (
    <div className="center">
      <form className="form" onSubmit={this.handleSubmit}>
      <label className="label">
      Username:
      </label>
      <input className="inputField" type="text" name="name" onChange={this.changeName} value={this.state.username}/>
      <label className="label">
      Password:
      </label>
      <input className="inputField" type="password" name="name" onChange={this.changePassword} value={this.state.password}/>
      <input className="fsSubmitButton" type="submit" value="Submit" />
      </form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (name, user_id) => {
      dispatch(loginUser(name, user_id))
    },
    isUserAuthorized: (user_id) => {
      dispatch(isUserAuthorized(user_id))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)
