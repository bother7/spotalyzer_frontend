import React from 'react';



export default class SongContainer extends React.Component {
  componentDidMount(){
    this.refs.myIframe.onload = () => {
      console.log(this.refs.myIframe)
    }
  }
  render () {
    return (
      <iframe className="player" src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A33Q6ldVXuJyQmqs8BmAa0k" sandbox="allow-scripts" ref="myIframe" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
    );
  }

}
