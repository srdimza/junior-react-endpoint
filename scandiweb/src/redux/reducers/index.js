import category from "./category";
import currency from "./currency";
import {combineReducers} from 'redux';
import cartReducer from './cart';
import productSelectedReducer from "./product-view";
import view_bag from "./bag"
import initialize_attributes from "./initialize_attributes";

const allReducers = combineReducers({
    category, 
    currency,
    cart : cartReducer,
    product: productSelectedReducer,
    view_bag,
    initialize_attributes,
});
export default allReducers;