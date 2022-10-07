import cart from '../media/Cart.svg'
import React from 'react';
import CartProducts from './CartProducts';
import {connect} from 'react-redux';
import OutsideClick from '../OutsideClick';
import { viewBag } from '../redux/actions';
import {} from '../redux/actions/index'
import {makeSelectedProductNull} from '../redux/actions'

const handleChildElementClick = (e) => {
  e.stopPropagation()
}

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      dropdown: "none",
    };
  }
  changeDropdownState= () =>{
    if(this.state.dropdown === 'none'){
   
      this.setState({
        dropdown: ''
      })
      document.getElementsByClassName('full-screen-cart-open')[0].style.display = '';
    }else{
      this.setState({
        dropdown: 'none'
      })
      document.getElementsByClassName('full-screen-cart-open')[0].style.display = 'none';
    }
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
  getNumberOfItemsInCart(){
    const cart = this.props.state.cart.cart;
    let index = 0;
    for(let i = 0; i< cart.length ; i++){
    if(cart[i].id !== null){
      index += cart[i].qty;
    }else{
      index++;
    }

    }
    if(cart.length > 0){

   
   if(cart[0].id === null){
      index--;
   }
  }
    return index;
  }
    render(){

      return (
        <div>

            <OutsideClick dropdownActive={this.state.dropdown} name={'small-cart'}>
            <button className='cart_icon' onClick={this.changeDropdownState}><img  src={cart}></img> 
            <div className = 'cart_count_circle'><p>{this.getNumberOfItemsInCart()}</p></div>
            </button>
               
                    {}    <div onClick = {this.changeDropdownState} className='full-screen-cart-open'  style={{"display": this.state.dropdown}}>{}
                   
             <div className= 'cart_dropdown' onClick={(e) => handleChildElementClick(e)} style={{"display": this.state.dropdown}}>
               <div className='my-bag'>
                   <h1 >My bag,</h1>
                   <p> {this.getNumberOfItemsInCart()} items</p>
              </div>
              <CartProducts cart_display={'small'}/> 
              
              <div className = 'small-cart-total'>
                <h1>Total</h1>
                <h1 className='small-cart-total-price'>{this.props.state.currency.symbol[2]}{this.getTotalCartSum()}</h1>
              </div>
              <div className='small-cart-buttons'>
                 <button className='view-bag-button' onClick={() => (this.props.viewBag({view: 'true'}, this.props.makeSelectedNull()))}>VIEW BAG</button>
                 <button className='check-out-button'>CHECK OUT</button>
              </div>
            </div>
           {} </div>  {}
            </OutsideClick>
        </div>
      );
    }
  }
  function mapStateToProps(state) {
  return {
  
state,
  };
}
function  mapDispatchToProps(dispatch){
  return {
    viewBag: (view) => dispatch(viewBag(view)),
    makeSelectedNull: () => dispatch(makeSelectedProductNull()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);