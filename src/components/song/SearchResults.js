import React from 'react';
import {connect} from 'react-redux'
import {playSong} from '../../actions/index'

class SearchResults extends React.Component {

  handlePlay = (event) => {
    event.preventDefault()
    this.props.playSong(event.target.dataset.uri)
  }

  render () {
    if (this.props.array !== []) {
    var tablerows = this.props.array.map((row) => {return (<tr>{row.title}<td>{row.artist}</td><td><button onClick={this.handlePlay} data-uri={row.uri}>Play Song</button></td></tr>)})
    }
    return (<table>{tablerows}</table>)

  }
}

function mapStateToProps(state) {
  return {
    array: state.songs.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playSong: (uri) => {
      dispatch(playSong(uri))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
