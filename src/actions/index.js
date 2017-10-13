import { env_url } from '../components/data/environment'

export function loginUser (name, user_id) {
  return {type: 'LOGIN_USER', username: name, user_id: user_id}
}

export function removeUser () {
  return {type: 'REMOVE_USER'}
}

export function currentSong (song) {
  return {type: 'CURRENT_SONG', payload: song}
}

export function authorizeUser () {
  return {type: 'AUTHORIZE_USER'}
}

export function endFetchRecent (json) {
  return {type: 'FETCH_RECENT', payload: json}
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

export function searchResults(json) {
  return {type: 'SEARCH_RESULTS', payload: json}
}

export function finishLoading () {
  return {type: 'FINISH_LOADING'}
}

export function currentlyLoading () {
  return {type: 'CURRENTLY_LOADING'}
}

export function goHome () {
  return {type: 'GO_HOME'}
}

export function playSong(uri) {
  return {type: 'LOAD_SONG', payload: uri}
}
