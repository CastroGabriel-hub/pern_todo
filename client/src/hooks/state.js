export function reducer(state, action){
  switch (action.type){
    case 'setTodos':
      return {...state, todos: action.content};
    case 'setIsCompleted':
      return {...state, isCompleted: action.content};
    case 'reloadPage':
      return {...state, reloadListener: action.content}
    default:
      return state;
  }
}

export const initialValues = {
  todos: [],
  isCompleted: false,
  reloadListener: 0,
};