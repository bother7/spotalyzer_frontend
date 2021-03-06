import { env_url } from '../components/data/environment'

export function addPlaylistToRecent(playlist) {
  return {type: 'ADD_PLAYLIST_TO_RECENT', payload: playlist}
}

export function addToPlaylist (song_id) {
  return {type: 'ADD_TO_PLAYLIST', payload: song_id}
}

export function authorizeUser () {
  return {type: 'AUTHORIZE_USER'}
}

export function clearPlaylistSongs (){
  return {type: 'CLEAR_PLAYLIST_SONGS'}
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
      if (json.status !== 418){
      dispatch(getPlaylists())
      dispatch(newCurrentPlaylist(json.id))
    } else {
      alert('playlist creation unsuccessful')
    }})
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
      dispatch(clearPlaylistSongs())
      if (!json.error) {
        dispatch(retrievePlaylists(json))
      }
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

export function fetchSearchResults(json, searchFilter) {
  return {type: 'SEARCH_RESULTS', payload: json, filter: searchFilter}
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
      }
    })
  }
}
export function getRecommendation() {
  return function (dispatch) {
    fetch(`${env_url}/recommendation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    }).then(resp => resp.json())
    .then(json => {
      if (json.status !== "error" && json.status !== 500) {
        dispatch(storeRecommendation(json))
      }
    })
  }
}

export function getSaved() {
  return function (dispatch) {
    fetch(`${env_url}/saved`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    }).then(resp => resp.json())
    .then(json => {
      if (json.status !== "error") {
        dispatch(storeSavedSongs(json))
      }
    })
  }
}

export function getSongAnalysis (id) {
  return function(dispatch) {
    fetch(`${env_url}/songs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      }
    }).then(resp => resp.json())
    .then(json => {
      dispatch(playSong(json.uri))
      dispatch(storeSongAnalysis(json.data))
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

export function playCurrentPlaylist(id) {
  return {type: 'PLAY_CURRENT_PLAYLIST', payload: id}
}

export function playSearchPlaylist(playlist) {
  return function (dispatch) {
    dispatch(addPlaylistToRecent(playlist))
    dispatch(sendCurrentPlaylist(playlist.id))
    fetch(`${env_url}/playlists/${playlist.id}`, {
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
      }}).then(ok => dispatch(playCurrentPlaylist(playlist.id)))
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

export function savePlaylist(playlist) {
  return function (dispatch) {
    dispatch(addPlaylistToRecent(playlist))
    dispatch(sendCurrentPlaylist(playlist.id))
    fetch(`${env_url}/playlists/${playlist.id}`, {
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
      dispatch(fetchSearchResults(json, searchFilter))
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

export function storeRecommendation(json){
  return {type: 'STORE_RECOMMENDATION', payload: json}
}

export function storeSavedSongs(array) {
  return {type: 'STORE_SAVED_SONGS', payload: array}
}

export function storeSongAnalysis(data) {
  return {type: 'STORE_SONG_ANALYSIS', payload: data}
}

export function toggleSearch(){
  return {type: 'TOGGLE_SEARCH'}
}

export function tweakPlaylist(song_array) {
  return {type: 'TWEAK_PLAYLIST', payload: song_array}
}

export function updatePlaylist(id, song_array) {
  return function (dispatch){
    fetch(`${env_url}/playlists/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
        },
        body: JSON.stringify({
            song_array: song_array
          })
      })
      .then((resp) => resp.json())
      .then(json => {
        if (json.snapshot_id){
          alert("success")
        } else {
          alert("update was not successful")
        }
      })
  }
}

export function userMustAuth() {
  return {type: 'USER_MUST_AUTH'}
}

export function updateSavedSongs(array) {
  return function (dispatch) {
    dispatch(storeSavedSongs(array))
    fetch(`${env_url}/saved`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem("jwt_token")}`
      },
      body: JSON.stringify({
          song_array: array
        })
    }).then(resp => resp.json())
    .then(json => {
    })
  }
}
