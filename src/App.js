import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, NavLink} from 'react-router-dom'
import Nav from './components/user_interface/Nav'
import SongContainer from './components/song/SongContainer'
import MenuLeft from './components/user_interface/MenuLeft'
import MenuRight from './components/user_interface/MenuRight'
import SongPlayer from './components/song/SongPlayer'
import CallbackSpotify from './components/user_interface/CallbackSpotify'
import {connect} from 'react-redux'
import Login from './components/user_interface/Login'

// add scope to auth
const auth = 'https://accounts.spotify.com/en/authorize?client_id=4ca18a2c6f894c9783d233393c8115bc&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&show_dialog=true'


class App extends Component {



  handleAuthorize = (event) => {
    console.log("this worked", this.props.isAuthorized)
    // fetch("https://accounts.spotify.com/en/authorize?client_id=4ca18a2c6f894c9783d233393c8115bc&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&show_dialog=true")
  }


  signOut = (event) => {
  localStorage.removeItem('user_id')
  //replace with jwt token later when we have jwt tokens, as of now we don't have jwt tokens in the "tim was here" -commit.
  // dispatch signout
  }


  render() {
    return (
      <div className="wrapper">
        <Nav handleAuthorize={this.handleAuthorize} signOut={this.signOut} />
        <MenuLeft />
        <MenuRight />
        <SongContainer />
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
    isAuthorized: state.users.isAuthorized
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)
