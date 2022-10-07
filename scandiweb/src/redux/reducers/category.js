const category = (state = {category:'all'}, action) => {
    switch(action.type) {
    case "SET_CATEGORY":
        state ={
         ...state,
         category: action.payload
        }  
     break;
 }
        return state;
}

export default category;