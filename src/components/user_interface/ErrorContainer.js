import React from 'react';
import {connect} from 'react-redux'


class ErrorContainer extends React.Component {
  render(){
    return(<p>Errors happened</p>)
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)
