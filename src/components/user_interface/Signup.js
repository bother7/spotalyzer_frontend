import React from 'react'
import {env_url} from '../data/environment'
import {connect} from 'react-redux'
import {loginUser} from '../../actions/index'

class Signup extends React.Component {
  state = {
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
  }

  changeName = (event) => {
    this.setState({name: event.target.value})
  }
  changeUserName = (event) => {
    this.setState({username: event.target.value})
  }
  changePassword = (event) => {
    this.setState({password: event.target.value})
  }
  changeConfirmationPassword = (event) => {
    this.setState({confirmPassword: event.target.value})
  }

  checkPasswords = () => {
    return (this.state.password === this.state.confirmPassword)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.checkPasswords()) {
      fetch(`${env_url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        })
      }).then(response => response.json())
      .then((userInfo) => {
        this.props.handleLogin(userInfo.name, userInfo.id, userInfo.jwt_token)
        return this.props.history.push('/')
      })
    } else {
      alert("your passwords don't match!")
    }
  }

  render(){
    return (<div className="center"><form onSubmit={this.handleSubmit}>
      <br></br>
      <label className="label">
        Name:
      </label>
        <input type="text" name="name" onChange={this.changeName} value={this.state.name}/>
        <br></br>
      <label className="label">
        Username:
      </label>
        <input type="text" name="name" onChange={this.changeUserName} value={this.state.username}/>
        <br></br>
      <label className="label">
        Password:
      </label>
        <input type="password" name="name" onChange={this.changePassword} value={this.state.password}/>
        <br></br>
      <label className="label">
        Confirm Password:
      </label>
        <input type="password" name="name" onChange={this.changeConfirmationPassword} value={this.state.confirmPassword}/>
        <input className="fsSubmitButton" type="submit" value="Submit" />
      </form></div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (name, user_id, jwt_token) => {
      dispatch(loginUser(name, user_id, jwt_token))
    }
  }
}


export default connect(null, mapDispatchToProps)(Signup)
