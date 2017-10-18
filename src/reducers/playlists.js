

export default function users(state = {recentPlaylists: [], currentPlaylist: "", currentPlaylistSongs: [], fixedPlaylistSongs: []}, action) {
  switch (action.type) {
    case 'GET_PLAYLISTS':
      return {...state, recentPlaylists: action.payload}
    case 'CLEAR_PLAYLIST_SONGS':
      return {...state, currentPlaylist: "", currentPlaylistSongs: []}
    case 'SEND_CURRENT_PLAYLIST':
      return {...state, currentPlaylist: action.payload}
    case 'SIGN_OUT':
      return {...state, recentPlaylists: [], currentPlaylist: ""}
    case 'STORE_PLAYLIST_SONGS':
      return {...state, currentPlaylistSongs: action.payload}
    case 'PLAY_CURRENT_PLAYLIST':
      return {...state, fixedPlaylistSongs: state.currentPlaylistSongs}
    case 'TWEAK_PLAYLIST':
      return {...state, currentPlaylistSongs: action.payload}
    default:
      return state
  }
}
