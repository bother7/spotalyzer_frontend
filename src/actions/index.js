

export function addUser (name) {
  return {type: 'ADD_USER', user: name}
}

export function removeUser () {
  return {type: 'REMOVE_USER'}
}

export function currentSong (song) {
  return {type: 'CURRENT_SONG', song: song}
}
