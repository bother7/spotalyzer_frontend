

export default function songs(state = {song: null, loading: false, searchResults: [], container: null, uri: "spotify:track:5NIPsWpDjJTFBoPxCUUeXp", recentlyPlayed: []}, action) {
  switch (action.type) {
    case 'CURRENT_SONG':
      return {...state, song: action.name}
    case 'CURRENTLY_LOADING':
      return {...state, loading: true}
    case 'FINISH_LOADING':
      return {...state, loading: false}
    case 'SEARCH_RESULTS':
      return {...state, searchResults: action.payload, container: "search"}
    case 'LOAD_SONG':
      return {...state, uri: action.payload, container: "visualize"}
    case 'GO_HOME':
      return {...state, container: "welcome"}
    case 'FETCH_RECENT':
      return {...state, recentlyPlayed: action.payload}
    case 'SIGN_OUT':
      return {...state, song: null, loading: false, searchResults: [], container: null, uri: "spotify:track:5NIPsWpDjJTFBoPxCUUeXp", recentlyPlayed: []}
      // song reducer handles render of center box so play current playlist goes here
    case 'PLAY_CURRENT_PLAYLIST':
      return {...state, container: "playlist"}
    default:
      return state
  }
}
