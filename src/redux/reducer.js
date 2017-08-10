
const todoReducer = (state = {islogin:false}, action) => {
  switch (action.type) {
    case 'LOGIN':
        state = {islogin:true};
        return Object.assign({},state,action.user);
    case 'LAYOUT':
        state = {islogin:false};
      return state;
    default:
      return state
  }
}

export default todoReducer
