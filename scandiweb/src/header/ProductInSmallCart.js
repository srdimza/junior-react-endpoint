import { validateOperation } from '@apollo/client/link/utils';
import React from 'react';
import {connect} from 'react-redux';
import { reduceQty, addQty, addToCart, viewBag } from '../redux/actions';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import SizeSelector from '../mainPage/SizeSelector';
import Previous from '../media/Previous.svg'
import Next from '../media/Next.svg'
const GET_PRODUCT_BY_ID_1 = gql`
query Category1($productIds: String!) {
  product(id: $productIds) {
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
    id
  }
}
`;

const GET_ATTRIBUTES = gql`
query ExampleQuery($productId: String!) {
  product(id: $productId) {
    attributes {
      items {
        displayValue
        value
        id
      }
      id
      name
      type
    }
  }
}`;


function swapImage(index_gallery, gallery, index, add){
  const cart = document.getElementsByClassName('cart')[0];
  const image = cart.getElementsByClassName('small-cart-img')[index];
  const current_image = image.getAttribute('src');

 for(let i = 0; i<gallery.length ; i++){
   if(gallery[i] === current_image){
    index_gallery = i;
   }
 }


  if(document.getElementsByClassName('small-cart-img')[index]){
    if(add){
      if(index_gallery +1 >= gallery.length){
        image.setAttribute('src', gallery[0]);
      }else{
        image.setAttribute('src', gallery[index_gallery + 1]);
      }
     
    }else{
      if(index_gallery  <= 0){
        image.setAttribute('src', gallery[gallery.length-1]);
      }else{
        image.setAttribute('src', gallery[index_gallery -1]);
      }
      
    }

  }


}
function RenderProduct(props, index){
const index_currency = props.product.state.currency.symbol[1];
const product_id = props.product.product.id;
  const { data: data, loading: loading, error: error } = useQuery( GET_PRODUCT_BY_ID_1, {
    variables: { 
     fetchPolicy: 'no-cache',
      "productIds": product_id,
   },
  });
  const { data: attribute_data, loading: load_2, error: error_2 } = useQuery(GET_ATTRIBUTES,
    {variables: {
      "productId": product_id,
      '__typename': product_id,
    }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p className = "error_p">No products to display. Add products to cart to view them here! </p>;
  if (load_2) return <p>Loading...</p>;
  if (error_2) return <p>Error : </p>;
 if(product_id !== null){

const attributes = props.product.product.attributes;

 if(props.product.cart_display == 'small' || props.product.cart_display == 'large'){
 let currentImageIndex = 0;
 return (
  <div className='small-cart-product-box' >
      <div className='small-cart-product-data'>
         <h1 className='small-cart-brand'> {data.product.brand}</h1>
         <h1 className='small-cart-product-name' > {data.product.name}</h1>
         <h1 className='small-cart-price'> {data.product.prices[index_currency].currency.symbol}{data.product.prices[index_currency].amount}</h1>
         
         <SizeSelector attributes = {attributes}  cart_display={props.product.cart_display} index={props.product.index} />
      
        </div>
        
        <div className= 'plus-minus-small-cart'>
       
        {}   <button className='small-cart-plus' onClick={() => (props.product.addQty(props.product.index), props.product.viewBag({view: props.product.state.view_bag.view_bag}))}><span className='plus-minus-text'>+</span></button>  {} 
        
           <h1>{props.product.product.qty}</h1>
        {}     <button className='small-cart-minus' onClick={() => (props.product.reduceQty(props.product.index), props.product.viewBag({view :props.product.state.view_bag.view_bag}))}><span className='plus-minus-text'>-</span></button> {}  
        </div>
        <div className='bag-image-container'>
         <img className = 'small-cart-img' src={data.product.gallery[currentImageIndex]} ></img>
         <span  className = 'prev-next-buttons' >
         <img className = 'prev-button'src={Previous} onClick={() =>  swapImage(currentImageIndex, data.product.gallery, props.product.index ,false)} ></img> 
         <img className = 'next-button'src={Next}  onClick={() =>  swapImage(currentImageIndex, data.product.gallery, props.product.index ,true)} ></img> 
         </span>
         </div>
   </div>
   
 );}else{
  return (<p className = "error_p">No products to display. Add products to cart to view them here! </p>)
 }
}else {
  return (<p className = "error_p">No products to display. Add products to cart to view them here! </p>)
}
 }
 
function setVariations(variations, index, prod_attributes) {

const small_cart = document.getElementsByClassName('cart_dropdown')[0];
for(let i=0; i<variations.cart[index].variation.length; i++ ){
  const attributes = small_cart.getElementsByClassName(variations.cart[index].variation[i].name + '_attribute');
  const attribute_div = attributes[index];

  if(attribute_div != null){
    const buttons = attribute_div.querySelectorAll('button');
    for(let k =0; k<buttons.length; k++){
    if(buttons[k].className === 'selected_attribute_button_'+ prod_attributes[i].type){
      buttons[k].classList.remove('selected_attribute_button_'+ prod_attributes[i].type)
      
      buttons[k].setAttribute('class', 'attribute_button_' + prod_attributes[i].type);
    }
     if(buttons[k].id === variations.cart[index].variation[i].variation ){
      buttons[k].classList.remove('attribute_button_' + prod_attributes[i].type);
      buttons[k].setAttribute('class', 'selected_attribute_button_'+ prod_attributes[i].type)
      }
   }
  }
}}

class ProductInSmallCart extends React.Component {
  getCurrencyIndex(){
    return this.props.state.currency.symbol[1];
  }
 
  render (){
   const propi = this.props;
    return  (
      <RenderProduct product = {propi} /> 
   

    );
}}

function mapStateToProps(state) {
  return {
  
state,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (variation, id) => dispatch(addToCart(variation, id)),
    addQty: (index) => dispatch(addQty(index)),
    reduceQty: (index) => dispatch(reduceQty(index)),
    viewBag: (boolean) => dispatch(viewBag(boolean)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductInSmallCart);