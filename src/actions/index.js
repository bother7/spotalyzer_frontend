import { env_url } from '../components/data/environment'

export function addUser (name) {
  return {type: 'ADD_USER', payload: name}
}

export function removeUser () {
  return {type: 'REMOVE_USER'}
}

export function currentSong (song) {
  return {type: 'CURRENT_SONG', payload: song}
}

export function searchTerm (search) {
  return function(dispatch) {
    dispatch(currentlyLoading())
    console.log(`${env_url}/search/${search}`)
    fetch(`${env_url}/search/${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
