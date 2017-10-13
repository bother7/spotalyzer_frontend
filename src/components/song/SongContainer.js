import React from 'react';
import SongVisual from './SongVisual'
import SearchResults from './SearchResults'
import Welcome from './Welcome'

export default class SongContainer extends React.Component {

  render () {
    switch (this.props.container) {
      case 'visualize':
        return (
        <div className="center">
        <SongVisual />
        </div>)
      case 'search':
        return (<div className="center">
        <SearchResults />
        </div>)
      case 'welcome':
        return (
          <div className="center">
          <Welcome />
          </div>)
      default:
        return (
          <div className="center">
          <Welcome />
          </div>)
        }
    }
}
