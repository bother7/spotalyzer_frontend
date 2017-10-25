import React from 'react';
import {NavLink} from 'react-router-dom'
import spotalyzer_logo from '../../imgs/spotalyzer_logo2.svg'
import {connect} from 'react-redux'

class Nav extends React.Component {

  renderSignup = () => {
    if (this.props.username === "") {
      return (<NavLink activeClassName="active" className="item" to="/signup">signup</NavLink>)
    }
  }

  renderLogin = () => {
    if (this.props.username === "") {
      return (<NavLink activeClassName="active" className="item" to="/login">login</NavLink>)
    }
  }

  renderAuthorize = () => {
    if (this.props.isAuthorized === false) {
      return (<NavLink activeClassName="active" className="item" to="/authorize" onClick={this.props.handleAuthorize}>authorize</NavLink>)
    }
  }

  renderDemo = () => {
    if (this.props.username === "") {
      return (<NavLink to="/" onClick={this.props.demoLogin} className="item">demo</NavLink>)
    }
  }

  renderLogout = () => {
    if (this.props.username !== "") {
      return (<NavLink to="/" onClick={this.props.signOut} className="item">logout</NavLink>)
    }
  }
 render() {
   return (
     <div className="navbar">
       <div className="logo-box">
        <img src={spotalyzer_logo} className="logo" alt="logo" />
        </div>
        <div className="navbar-right">
          {this.renderSignup()}
          {this.renderLogin()}
          {this.renderAuthorize()}
          {this.renderLogout()}
          {this.renderDemo()}
          <NavLink activeClassName="active" onClick={this.props.goHome} className="item" to="/">home</NavLink>

        </div>
      </div>
   )
 }

}

function mapStateToProps(state) {
  return {
    username: state.users.username,
    isAuthorized: state.users.isAuthorized
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav)
