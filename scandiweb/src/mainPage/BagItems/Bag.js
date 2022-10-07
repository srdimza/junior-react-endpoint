import { useQuery, gql } from '@apollo/client';
import CartProducts from '../../header/CartProducts'
import React from 'react';
import {connect} from 'react-redux';
class Bag extends React.Component {
  getNumberOfItemsInCart(){
    const cart = this.props.state.cart.cart;
    let index = 0;
    for(let i = 0; i< cart.length ; i++){
      index++;
    }
    if(cart.length > 0){

   
   if(cart[0].id === null){
      index--;
   }
  }
    return index;
  }
  getTotalCartSum(){
    const cart = this.props.state.cart.cart;
    let total_price = 0;
    const currency_index = this.props.state.currency.symbol[1];
    let qty = 0;
     for(let i = 0; i<cart.length; i++){
      if(  cart[i].id !== null){
        qty = cart[i].qty;
        total_price += cart[i].prices[currency_index].amount * qty;
      }

     }
     return Math.round(total_price * 100) / 100;
  }
  render(){
    return (
      <div className = 'cart'>
          <h1 className = 'cart-title'>CART</h1>
          <div className="cart-seperator"></div>
          <CartProducts cart_display={'large'} /> 

          <div className='bag-checkout'>
          <p className='bag-checkout-text1'>Tax 21%: </p>
          <p className='bag-value1'>{this.props.state.currency.symbol[2]}{Math.round((this.getTotalCartSum()*0.21) * 100) / 100}</p>
          <p className='bag-checkout-text2'>Quantity: </p>
          <p className='bag-value2'>{this.getNumberOfItemsInCart()}</p>
          <p className='bag-total3'>Total:</p>
          <p className='bag-value3'>{this.props.state.currency.symbol[2]}{Math.round((this.getTotalCartSum() + this.getTotalCartSum()*0.21) * 100) / 100}</p>
          <button> ORDER</button>
          </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
  
state,
  };
}
export default connect(mapStateToProps, null)(Bag);