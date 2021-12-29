const initialState = {
  todo: [],
};

const rootReducer = (state = initialState, action) => {
  console.log(state.todo);
  if (action.type === 'PATCH_LIST') {
    state.loading = true;
    state.todo = action.data;
  }

  if (action.type === 'DELETE_LIST') {
    let newState = state.todo.filter((todo) => {
      return todo.id !== action.id;
    });
    return { todo: newState };
  }

  if (action.type === 'UPDATE_LIST') {
    const { title, description, status } = action.data;
    state.todo.map((todo) => {
      if (todo.id === action.id) {
        todo.title = title ? title : todo.title;
        todo.status = status ? status : todo.status;
        todo.description = description ? description : todo.description;
      }
      return todo;
    });
  }

  state.loading = false;

  return state;
};

export default rootReducer;
