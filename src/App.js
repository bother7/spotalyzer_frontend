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
import {goHome, signOut, loginUser, isUserAuthorized, getPlaylists, userMustAuth} from './actions/index'
import {env_url} from './components/data/environment'
import Signup from './components/user_interface/Signup'

// add scope to auth


class App extends Component {



  signOut = (event) => {
  localStorage.removeItem('jwt_token')
  this.props.signOut()
  }

  goHome = (event)  => {
    if (this.props.username !== "" && this.props.isAuthorized) {
      this.props.goHome()
    } else {
      this.props.history.push('/')
    }
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
        if (json.status !== 500){
          this.props.handleLogin(json.name, json.id, localStorage.getItem('jwt_token'))
          this.props.isUserAuthorized(json.id)
          this.props.getPlaylists()
        }
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if (localStorage.getItem('jwt_token') !== null && !nextProps.isAuthorized) {
        this.props.userMustAuth()
    } else if (localStorage.getItem('jwt_token') !== null && nextProps.isAuthorized && (this.props.container === null)) {
        this.props.goHome()
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Nav handleAuthorize={this.handleAuthorize} signOut={this.signOut} goHome={this.goHome}/>
        <MenuLeft {...this.props} />
        <MenuRight {...this.props} />
        <SongPlayer />
        <Route path='/signup' render={ (props) => {return <Signup {...props} />}} />
        <Route path='/authorize' component={() => window.location = auth}/>
        <Route path='/login' render={ (props) => {return <Login {...props} />}} />
        <Route exact path="/callback" render={ (props) => {return <CallbackSpotify {...props} />}} />
        <Route exact path='/' render={(props) => {return <SongContainer {...props} container={this.props.container} searchResults={this.props.searchResults}/>}}/>
        <Route exact path='/playlists/:id' render={(props) => {
            return <SongContainer {...props} container={"playlist"} searchResults={this.props.searchResults}/>}}/>
        <Route exact path='/songs/:id' render={(props) => {
            return <SongContainer {...props} container={"visualize"} searchResults={this.props.searchResults}/>}}/>
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
    handleLogin: (name, user_id, jwt_token) => {
      dispatch(loginUser(name, user_id, jwt_token))
    },
    isUserAuthorized: (user_id) => {
      dispatch(isUserAuthorized(user_id))
    },
    getPlaylists: () => {
      dispatch(getPlaylists())
    },
    userMustAuth: () => {
      dispatch(userMustAuth())
    }

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
