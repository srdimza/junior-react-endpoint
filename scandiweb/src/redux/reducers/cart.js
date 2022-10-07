import * as cartActionTypes from '../actions/cart-action-types';

const INITIAL_STATE = {
  
  qty: 0,
  cart: [{
    id: null,
    qty: 0,
    variations: [],
  }] ,
  currentProduct: null,

}

      const cartReducer = (state = INITIAL_STATE, action) => {
        switch(action.type) {
          case cartActionTypes.ADD_TO_CART:
          for(let i =0; i < state.cart.length; i++){
            if(state.cart[i].id === action.payload.product.id){
                if(JSON.stringify(state.cart[i].variation) === JSON.stringify(action.payload.product.variation)){
                  state.cart[i].qty += 1;
                  return state;
                }
            }
          }
            return {
              ...state,
              cart: [...state.cart, action.payload.product],
            }
    case cartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      }
    case cartActionTypes.ADD_QTY:
      state.cart[action.payload.index].qty += 1;
      return state;
 
    case cartActionTypes.REDUCE_QTY:
      state.cart[action.payload.index].qty -= 1;
      if(state.cart[action.payload.index].qty < 1){
        state.cart.splice(action.payload.index, 1);
      }
        return state;

    case cartActionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      }
    case "EDIT_VARIATIONS":{
      for(let variant of state.cart[action.payload[1]].variation){
        if(variant.name === action.payload[2]){
       
          variant.variation = action.payload[0];
        }
      }
      return state
    }
    default:
      return state;
  }

}


export default cartReducer;