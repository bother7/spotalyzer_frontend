

export default function users(state = [], action) {
  switch (action.type) {
    case 'ADD_USER':
      return {...state, user: action.name}
    case 'REMOVE_USER':
      return {...state, user: ""}
    default:
      return state
  }
}
