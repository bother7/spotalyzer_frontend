import React from 'react';
import {connect} from 'react-redux'
import {fetchRecent, playSong} from '../../actions/index'

class Welcome extends React.Component {

  handlePlay = (event) => {
    event.preventDefault()
    this.props.playSong(event.target.dataset.uri)
  }

componentDidMount(){
  this.props.getRecent()
}

  render () {
    if (this.props.recentlyPlayed !== []) {
      var tablerows = this.props.recentlyPlayed.map((row) => {return (<tr>{row.title}<td>{row.artist}</td><td><button onClick={this.handlePlay} data-uri={row.uri}>Play Song</button></td></tr>)})
      return (<table>{tablerows}</table>)
  } else {
    return (<div>Loading Recently Played</div>)
  }
  }

}

function mapStateToProps(state) {
  return {
    recentlyPlayed: state.songs.recentlyPlayed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecent: () => {
      dispatch(fetchRecent())
    },
    playSong: (uri) => {
      dispatch(playSong(uri))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
