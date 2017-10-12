import React from 'react';
import {NavLink} from 'react-router-dom'


export default class Nav extends React.Component {

 render() {
   return (
     <div className="navbar">
        <a>Spotify Data Visualizer </a>
          <NavLink activeClassName="active" className="item" to="/">Home</NavLink>
          <NavLink activeClassName="active" className="item" to="/signup">Signup</NavLink>
          <NavLink activeClassName="active" className="item" to="/login">Login</NavLink>
          <NavLink activeClassName="active" className="item" to="/authorize" onClick={this.props.handleAuthorize}>Authorize</NavLink>
            <NavLink to="/" onClick={this.props.signOut}>Logout</NavLink>
      </div>
   )
 }

}
