import React from 'react';
import SongVisual from './SongVisual'
import SongList from './SongList'
import ErrorContainer from '../user_interface/ErrorContainer'
import PlaylistContainer from './PlaylistContainer'


export default class SongContainer extends React.Component {

  render () {
    switch (this.props.container) {
      case 'visualize':
        return (
        <div className="center">
        <SongVisual {...this.props}/>
        </div>)
      case 'welcome', 'search', 'playlist':
        return (
          <div className="center">
          <SongList {...this.props}/>
          </div>)
      case 'error':
        return (
          <div className="center">
          <ErrorContainer {...this.props}/>
          </div>
        )
      default:
        return (
          <div className="center">
          <SongList {...this.props}/>
          </div>)
        }
    }
}
