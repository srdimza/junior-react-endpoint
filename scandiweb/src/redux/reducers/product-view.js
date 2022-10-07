
const INITIAL_STATE = {
  productSelected: null,
  variations: [],
  price: null
}

const productSelectedReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SELECT_PRODUCT":
      {
      return {...state,
        productSelected: action.payload,
        variations: [],
      }
    }
    case "MAKE_NULL":
      {
state =  {
  productSelected: null,
  variations: [],
  price: null
}
   return INITIAL_STATE;
}
    case "SET_VARIATION":
      {
     let  name_exists = false;
      for(let i =0; i< state.variations.length; i++){ 
        if(state.variations[i].name === action.payload_1){
          state.variations[i].variation = action.payload;
          return state;
        }
      }
      if(state.variations.length < 1){

        state.variations.push({name:action.payload_1, variation: action.payload})
        name_exists = true;
      }
      if(!name_exists){
        state.variations.push({name:action.payload_1, variation: action.payload}) 
      }
      return state;
    }
   
    default:
      return state;

  }
}


export default productSelectedReducer;