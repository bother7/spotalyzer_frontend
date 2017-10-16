import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Nav from './components/user_interface/Nav'
import SongContainer from './components/music/SongContainer'
import MenuLeft from './components/user_interface/MenuLeft'
import MenuRight from './components/user_interface/MenuRight'
import SongPlayer from './components/music/SongPlayer'
import CallbackSpotify from './components/user_interface/CallbackSpotify'
import {connect} from 'react-redux'
import Login from './components/user_interface/Login'
import {auth} from './components/data/auth_url'
import {goHome, signOut, loginUser, isUserAuthorized} from './actions/index'
import {env_url} from './components/data/environment'

// add scope to auth


class App extends Component {



  handleAuthorize = (event) => {
    console.log("this worked", this.props.isAuthorized)
  }


  signOut = (event) => {
  localStorage.removeItem('jwt_token')
  this.props.signOut()
  }

  goHome = (event)  => {
    this.props.goHome()
  }

  componentDidMount() {
    if (localStorage.getItem('jwt_token') !== null && this.props.username === "") {
      fetch(`${env_url}/users/persist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
        }
      })
      .then(response => response.json())
      .then((json) => {
        this.props.handleLogin(json.name, json.id)
        this.props.isUserAuthorized(json.id)
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Nav handleAuthorize={this.handleAuthorize} signOut={this.signOut} goHome={this.goHome}/>
        <MenuLeft />
        <MenuRight />
        <SongContainer container={this.props.container} searchResults={this.props.searchResults}/>
        <SongPlayer />
        <Route path='/authorize' component={() => window.location = auth}/>
        <Route path='/login' render={ (props) => {return <Login {...props} />}} />
        <Route exact path="/callback" render={ (props) => {return <CallbackSpotify {...props} />}} />
      </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.users.isAuthorized,
    container: state.songs.container,
    searchResults: state.songs.searchResults,
    username: state.users.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goHome: () => {
      dispatch(goHome())
    },
    signOut: () => {
      dispatch(signOut())
    },
    handleLogin: (name, user_id) => {
      dispatch(loginUser(name, user_id))
    },
    isUserAuthorized: (user_id) => {
      dispatch(isUserAuthorized(user_id))
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
