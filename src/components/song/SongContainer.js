import React from 'react';
import SongPlayer from './SongPlayer'
import SongVisual from './SongVisual'

export default class SongContainer extends React.Component {

  render () {
    return (
      <div className="wrapper">
      <SongPlayer />
      <SongVisual />
      </div>
    )
  }
}
