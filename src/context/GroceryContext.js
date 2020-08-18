import createDataContext from './createDataContext';
import {db} from '../firebase/config';

const groceryReducer = (state, action) => {
  switch (action.type) {
    case 'get_groceries':
      return action.payload;
    case 'delete_grocery':
      return state.filter((groceryItem) => groceryItem.id !== action.payload);
    case 'edit_grocery':
      return state.map((groceryItem) => {
        return groceryItem.id === action.payload.id ? action.payload : groceryItem;
      })
    default:
      return state;
  }
};

const getGroceries = dispatch => {
  return async () => {
    const response = await db.get('/groceries');
    dispatch({ type: 'get_groceries', payload: response.data });
  };
};

// componentDidMount() {
//   db.ref('/todos').on('value', querySnapShot => {
//     let data = querySnapShot.val() ? querySnapShot.val() : {};

//     let todoItems = {...data};
//     console.log(data);
//     this.setState({
//       todos: todoItems,
//     });
//   });
// }



const addGroceryItem = (dispatch) => {
  return async (title, category, callback) => {
    await db.ref('/groceries').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
    });
    dispatch({ type: 'add_grocery', payload: { title, category } });
    if (callback) {
      callback();
    }
  };
};



// const addBlogPost = (dispatch) => {
//   return (title, content, callback) => {
//     dispatch({ type: 'add_blogpost', payload: { title, content } });
//     if (callback) {
//       callback();
//     }
//   };
// };

const deleteGroceryItem = (dispatch) => {
  return async (id) => {
    await db.delete(`/groceries/${id}`);
    dispatch({ type: 'delete_grocery', payload: id })
  };
};

const editGroceryItem = (dispatch) => {
  return async (id, title, content, callback) => {
    await db.put(`/groceries/${id}`, { title, category });
    
    dispatch({ type: 'edit_grocery', payload: { id, title, category } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  groceryReducer, { addGroceryItem, deleteGroceryItem, editGroceryItem, getGroceries },
  []
);