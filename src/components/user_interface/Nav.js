import React from 'react';
import {NavLink} from 'react-router-dom'
import spotalyzer_logo from '../../imgs/spotalyzer_logo1.svg'

export default class Nav extends React.Component {

 render() {
   return (
     <div className="navbar">
       <div className="logo-box">
        <img src={spotalyzer_logo} className="logo" alt="logo" />
        </div>
        <div className="navbar-right">
          <NavLink activeClassName="active" onClick={this.props.goHome} className="item" to="/">home</NavLink>
          <NavLink activeClassName="active" className="item" to="/signup">signup</NavLink>
          <NavLink activeClassName="active" className="item" to="/login">login</NavLink>
          <NavLink activeClassName="active" className="item" to="/authorize" onClick={this.props.handleAuthorize}>authorize</NavLink>
          <NavLink to="/" onClick={this.props.signOut} className="item">logout</NavLink>
        </div>
      </div>
   )
 }

}
