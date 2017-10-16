

export default function users(state = {username: "", isAuthorized: false}, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      localStorage.setItem("jwt_token", action.jwt_token)
      return {...state, username: action.name, user_id:action.user_id}
    case 'REMOVE_USER':
      localStorage.removeItem("jwt_token")
      return {...state, username: ""}
    case 'AUTHORIZE_USER':
      return {...state, isAuthorized: true}
    case 'SIGN_OUT':
      return {...state, username: "", user_id: null, isAuthorized: false}
    default:
      return state
  }
}
