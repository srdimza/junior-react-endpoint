const view_bag = (state = {view_bag:'false'}, action) => {
    switch(action.type) {
    case "VIEW_BAG":
        state ={
         ...state,
        
         view_bag: action.payload.view
        }  
     default:
      return state;
 }
}

export default view_bag;