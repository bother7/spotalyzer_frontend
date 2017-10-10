

export default function songs(state = [], action) {
  switch (action.type) {
    case 'CURRENT_SONG':
      return {...state, song: action.name}
    default:
      return state
  }
}
