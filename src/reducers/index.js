import { combineReducers } from 'redux'
import users from './users'
import songs from './songs'


export default combineReducers( {
  users,
  songs
})
