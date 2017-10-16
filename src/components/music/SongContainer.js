import React from 'react';
import SongVisual from './SongVisual'
import SongList from './SongList'
import ErrorContainer from '../user_interface/ErrorContainer'


export default class SongContainer extends React.Component {

  render () {
    switch (this.props.container) {
      case 'visualize':
        return (
        <div className="center">
        <SongVisual />
        </div>)
      case 'welcome', 'search':
        return (
          <div className="center">
          <SongList />
          </div>)
      case 'error':
        return (
          <div className="center">
          <ErrorContainer />
          </div>
        )
      default:
        return (
          <div className="center">
          <SongList />
          </div>)
        }
    }
}
