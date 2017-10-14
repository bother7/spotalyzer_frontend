

export default function users(state = {recentPlaylists: [], currentPlaylist: ""}, action) {
  switch (action.type) {
    case 'GET_PLAYLISTS':
      return {...state, recentPlaylists: action.payload}
    case 'CURRENT_PLAYLIST':
      return {...state, currentPlaylist: action.payload}
    default:
      return state
  }
}
