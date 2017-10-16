import { env_url } from '../components/data/environment'

export function addToPlaylist (song_id) {
  return {type: 'ADD_TO_PLAYLIST', payload: song_id}
}

export function authorizeUser () {
  return {type: 'AUTHORIZE_USER'}
}

export function createPlaylist (name) {
  return function (dispatch) {
    fetch(`${env_url}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      },
      body: JSON.stringify({
          name: name
        })
    })
    .then((resp) => resp.json())
    .then((json) => {
      dispatch(getPlaylists())
      dispatch(newCurrentPlaylist(json.id))})
  }
}

export function currentlyLoading () {
  return {type: 'CURRENTLY_LOADING'}
}

export function currentSong (song) {
  return {type: 'CURRENT_SONG', payload: song}
}

export function deletePlaylist (id) {
  return function (dispatch) {
    fetch(`${env_url}/playlists/${id}`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
       }
    }).then(resp => resp.json())
    .then((json) => {
      dispatch(retrievePlaylists(json))
    })
  }
}

export function endFetchRecent (json) {
  return {type: 'FETCH_RECENT', payload: json}
}

export function endGoHome () {
  return {type: 'GO_HOME'}
}

export function fetchRecent () {
  return function(dispatch) {
    fetch(`${env_url}/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    })
    .then((resp) => resp.json())
    .then((json) => {dispatch(endFetchRecent(json))})
  }
}

export function finishLoading () {
  return {type: 'FINISH_LOADING'}
}

export function getPlaylists(){
  return function(dispatch) {
    fetch(`${env_url}/playlists/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    })
    .then((resp) => resp.json())
    .then((json) => {
      if (!json.error) {
        dispatch(retrievePlaylists(json))
        dispatch(newCurrentPlaylist(json[0].id))
      }
    })
  }
}

export function goHome () {
  return function(dispatch) {
    dispatch(fetchRecent())
    dispatch(endGoHome())
  }
}

export function isUserAuthorized (user_id) {
  return function(dispatch) {
    fetch(`${env_url}/users/checkauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    })
    .then((resp) => resp.json())
    .then((json) => {
      if (json.status === "success") {
        dispatch(authorizeUser())
        dispatch(goHome())
      }
    })
  }
}

export function loginUser (name, user_id, jwt_token) {
  return function(dispatch) {
    dispatch(sendLogin(name, user_id, jwt_token))
  }
}

export function newCurrentPlaylist (id) {
  return function(dispatch) {
    dispatch(sendCurrentPlaylist(id))
    fetch(`${env_url}/playlists/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.status !== "error"){
        dispatch(storePlaylistSongs(json))
      }})
  }
}

export function playSong(uri) {
  return {type: 'LOAD_SONG', payload: uri}
}

export function removeUser () {
  return {type: 'REMOVE_USER'}
}

export function retrievePlaylists(json){
    return {type: 'GET_PLAYLISTS', payload: json}
}


export function searchResults(json) {
  return {type: 'SEARCH_RESULTS', payload: json}
}

export function searchTerm (search, searchFilter) {
  return function(dispatch) {
    dispatch(currentlyLoading())
    fetch(`${env_url}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      },
      body: JSON.stringify({
          search: search,
          searchFilter: searchFilter
        })
    })
    .then((resp) => resp.json())
    .then((json) => {
      dispatch(searchResults(json))
      dispatch(finishLoading())
    })
  }
}

export function sendCurrentPlaylist (id) {
  return {type: 'SEND_CURRENT_PLAYLIST', payload:id}
}

export function sendLogin(name, user_id, jwt_token) {
    return {type: 'LOGIN_USER', name: name, user_id: user_id, jwt_token: jwt_token}
}

export function signOut() {
  return {type: 'SIGN_OUT'}
}
export function storePlaylistSongs(json) {
  return {type: 'STORE_PLAYLIST_SONGS', payload: json}
}
