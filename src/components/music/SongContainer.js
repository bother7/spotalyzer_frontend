import React from 'react';
import SongVisual from './SongVisual'
import SongList from './SongList'


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
      default:
        return (
          <div className="center">
          <SongList />
          </div>)
        }
    }
}
