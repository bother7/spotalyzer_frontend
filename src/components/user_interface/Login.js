import React from 'react'
import {env_url} from '../data/environment'
import {connect} from 'react-redux'
import * as actions from '../../actions'



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
      this.props.loginUser(json.name, json.id, json.jwt_token)
      this.props.isUserAuthorized(json.id)
      this.props.getPlaylists()
      this.props.getSaved()
      this.props.getRecommendation()
      this.props.history.push('/')
    })
  }

  render() {
    return (
    <div className="center">
      <form className="form" onSubmit={this.handleSubmit} style={{marginLeft: "10px"}}>
      <label className="label">
      Username:
      </label>
      <input  type="text" name="name" onChange={this.changeName} value={this.state.username}/>
      <label className="label">
      Password:
      </label>
      <input  type="password" name="name" onChange={this.changePassword} value={this.state.password}/>
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




export default connect(mapStateToProps, actions)(Login)
