export function reducer(state, action){
  switch (action.type){
    case 'setTodos':
      return {...state, todos: action.content};
    case 'setList':
      return {...state, list: action.content};
    case 'reloadPage':
      return {...state, reloadListener: action.content}
    default:
      return state;
  }
}

export const initialValues = {
  todos: [],
  list: 'pending',
  reloadListener: 0,
};