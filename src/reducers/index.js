import { combineReducers } from 'redux'
import users from './users'
import songs from './songs'
import playlists from './playlists'

export default combineReducers( {
  users,
  songs,
  playlists
})
