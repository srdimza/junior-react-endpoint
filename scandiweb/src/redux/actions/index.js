import * as cartActionTypes from './cart-action-types';

export function selectCategory(action){
    return {
      type: action.type,
      payload: action.payload

    };
  };
  export function selectCurrency(action){

      return {
        type: action.type,
        payload: action.payload
      };

  };

export const addToCart = (productSelected) => {
  return {
     type: cartActionTypes.ADD_TO_CART,
     payload:{
      product: productSelected,
     },
  };
};
export const removeFromCart = (productId) => {
  return {
     type: cartActionTypes.REMOVE_FROM_CART,
     payload:{
      id: productId
     },
  };
};
export const reduceQty = (index) => {
  return {
     type: cartActionTypes.REDUCE_QTY,
     payload:{
      index: index,
     },
  };
};
export const addQty = (index) => {
  return {
     type: cartActionTypes.ADD_QTY,
     payload:{
      index: index,
     },
  };
};

export const loadCurrentProduct = (product) => {
  return {
     type: cartActionTypes.LOAD_CURRENT_ITEM,
     payload: product,
  };
};

export const selectProduct = (product_id) => {
  return {
    type: "SELECT_PRODUCT",
    payload: product_id,
  }
}

export const setProductVariation = (variation, id) => {
  return {
    type: "SET_VARIATION",
    payload: variation,
    payload_1: id,

  }
}

export const makeSelectedProductNull = () => {
  return {
    type: "MAKE_NULL",
  }
}
export const viewBag = (view_bag) =>{
  return {
    type: "VIEW_BAG",
    payload: view_bag,
  }
}

export const editProductVariations = (variaton, index, id) => {
  return {
    type: "EDIT_VARIATIONS",
    payload: [variaton, index, id]
  }
}
export const initialize_attributes = (category_all) => {
  return { 
             type: "INITIALIZE",
            payload: category_all,
 }
}