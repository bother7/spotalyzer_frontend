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

export function searchTerm (search, searchFilter) {
  return function(dispatch) {
    dispatch(currentlyLoading())
    fetch(`${env_url}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          search: search,
          user_id: localStorage.getItem("user_id"),
          searchFilter: searchFilter
        })
    })
    .then((resp) => resp.json())
    .then((json) => {
      console.log(json)
      dispatch(finishLoading())
    })
  }
}

export function finishLoading () {
  return {type: 'FINISH_LOADING'}
}

export function currentlyLoading () {
  return {type: 'CURRENTLY_LOADING'}
}
