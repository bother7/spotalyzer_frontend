

export default function users(state = {username: "", isAuthorized: false}, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      localStorage.setItem("user_id", action.user_id)
      return {...state, username: action.username, user_id:action.user_id}
    case 'CHECK_USER':
      var user_id = localStorage.getItem("user_id")
      // for refreshes add fetch in here to grab user info
      return {...state, user_id: user_id}
    case 'REMOVE_USER':
      localStorage.setItem("user_id", action.user_id)
      return {...state, username: ""}
    case 'AUTHORIZE_USER':
      return {...state, isAuthorized: true}
    case 'SIGN_OUT':
      return {...state, username: "", user_id: null, isAuthorized: false}
    default:
      return state
  }
}
