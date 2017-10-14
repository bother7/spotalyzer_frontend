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
import {goHome} from './actions/index'

// add scope to auth


class App extends Component {



  handleAuthorize = (event) => {
    console.log("this worked", this.props.isAuthorized)
    // fetch("https://accounts.spotify.com/en/authorize?client_id=4ca18a2c6f894c9783d233393c8115bc&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&show_dialog=true")
  }


  signOut = (event) => {
  localStorage.removeItem('jwt_token')
  //replace with jwt token later when we have jwt tokens, as of now we don't have jwt tokens in the "tim was here" -commit.
  // dispatch signout
  }

  goHome = (event)  => {
    this.props.goHome()
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
    searchResults: state.songs.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goHome: () => {
      dispatch(goHome())
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
