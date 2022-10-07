import React from 'react';
import {connect} from 'react-redux';
import { addToCart } from '../redux/actions';
import ProductInSmallCart from './ProductInSmallCart';
function RenderProductsFromCart(){
    return(<div className='cart_product'>Cart Product</div>);
}



class CartProducts extends React.Component {
  render (){
    if(this.props.state.cart.cart.length > 1){
      const cart = this.props.state.cart.cart;
      if(cart[0].id === null){
        cart.shift();
      }
    }
    if(this.props.cart_display === 'small'){
      return this.props.state.cart.cart.map((product,index) => ( 
        
        <div key={product.id + index}>
        <ProductInSmallCart key= {product.id + index} product = {product} index = {index} cart_display={this.props.cart_display}/>
        </div>

  ))
    }else{


      return this.props.state.cart.cart.map((product,index) => ( 
        
          <div key={product.id + index}>
          <ProductInSmallCart key= {product.id + index} product = {product} index = {index} cart_display={this.props.cart_display}/>
          <div key = 'cart-seperator' className="cart-seperator"></div>
          </div>
  
    ))    }
}
}

function mapStateToProps(state) {
  return {
  state: state,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (variation, id) => dispatch(addToCart(variation, id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartProducts);