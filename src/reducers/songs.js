

export default function songs(state = {song: null, loading: false, searchResults: [], searchFilter: "track",container: null, uri: "spotify:track:5NIPsWpDjJTFBoPxCUUeXp", recentlyPlayed: []}, action) {
  switch (action.type) {
    case 'AUTHORIZE_USER':
      return {...state, container: "welcome"}
    case 'CURRENT_SONG':
      return {...state, song: action.name}
    case 'CURRENTLY_LOADING':
      return {...state, loading: true}
    case 'FINISH_LOADING':
      return {...state, loading: false}
    case 'SEARCH_RESULTS':
      return {...state, searchResults: action.payload, container: "search", searchFilter: action.filter}
    case 'LOAD_SONG':
      return {...state, uri: action.payload, container: "visualize"}
    case 'GO_HOME':
      return {...state, container: "welcome"}
    case 'FETCH_RECENT':
      return {...state, recentlyPlayed: action.payload}
    case 'TOGGLE_SEARCH':
      return {...state, container: "search"}
    case 'SIGN_OUT':
      return {...state, song: null, loading: false, searchResults: [], container: null, uri: "spotify:track:5NIPsWpDjJTFBoPxCUUeXp", recentlyPlayed: [], searchFilter: "track"}
      // song reducer handles render of center box so play current playlist goes here
    case 'PLAY_CURRENT_PLAYLIST':
      return {...state, container: "playlist"}
    case 'USER_MUST_AUTH':
      return {...state, container: "authorize"}
    default:
      return state
  }
}
