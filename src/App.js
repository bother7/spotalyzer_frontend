import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink} from 'react-router-dom'
import Nav from './components/user_interface/Nav'
import SongContainer from './components/song/SongContainer'
import MenuLeft from './components/user_interface/MenuLeft'
import MenuRight from './components/user_interface/MenuRight'


class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <MenuLeft />
        <MenuRight />
        <SongContainer />
      </div>
  );
  }
}

export default App;
