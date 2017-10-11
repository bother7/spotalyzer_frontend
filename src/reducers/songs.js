

export default function songs(state = {song: null, loading: false}, action) {
  switch (action.type) {
    case 'CURRENT_SONG':
      return {...state, song: action.name}
    case 'CURRENTLY_LOADING':
      return {...state, loading: true}
    case 'FINISH_LOADING':
      return {...state, loading: false}
    default:
      return state
  }
}
