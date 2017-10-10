import React from 'react';
import {NavLink} from 'react-router-dom'


export default class Nav extends React.Component {
 render() {
   return (
     <div className="navbar">
        <a>Spotify Data Visualizer </a>
          <NavLink activeClassName="active" className="item" to="/">Home</NavLink>
          <NavLink activeClassName="active" className="item" to="/signup">Signup</NavLink>
      </div>
   )
 }

}
