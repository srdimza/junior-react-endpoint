import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectedProductNull, selectProduct, viewBag} from '../redux/actions';
import cart from '../media/Cart2.svg'
import { addToCart } from '../redux/actions';
import {initialize_attributes} from '../redux/actions';
const GET_PRODUCTS = gql`
query Category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
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
      }
    }
  }
`;
function setCartSvgVisible(index){
  if( document.getElementsByClassName('circle_on_hover')[index]){

document.getElementsByClassName('circle_on_hover')[index].style.zIndex = '0'; 
  }
}
function setCartSvgInvisible(index){
   if( document.getElementsByClassName('circle_on_hover')[index]){
 
   
    document.getElementsByClassName('circle_on_hover')[index].style.zIndex = '-2';   
   }
 }
 function getVariationObject(variations, id, prices, e){
 e.stopPropagation();
  let variations_1 = [];
  for(let variation of variations){
    variations_1.push({name: variation.name, variation: variation.items[0].displayValue})
  }
  return {variation: variations_1, id: id, attributes:variations, prices: prices, qty: 1};
 }
function LoadProducts(info){
  const dispatch = useDispatch();
  const real_category = info.category.selectedCategory;
    const { loading: load, error: err, data: dat } = useQuery( GET_PRODUCTS, {
      variables: {  
        fetchPolicy: 'no-cache',
         "input": {
        "title": real_category 
      } },
    });
    const { loading: load_all, error: err_all, data: data_all } = useQuery( GET_PRODUCTS, {
      variables: {  
        fetchPolicy: 'no-cache',
         "input": {
        "title": real_category 
      } },
    });
    if (load) return <p>Loading...</p>;
    if (err) return <p>Error :</p>;
    if (load_all) return <p>Loading...</p>;
    if (err_all) return <p>Error :</p>;
    return  dat.category.products.map((product, index) => (
        <div className = {'product-box product-box-inStock-'+dat.category.products[index].inStock} key = {product.name}  onMouseEnter={() => setCartSvgVisible(index)}
        onMouseLeave={() => setCartSvgInvisible(index)}  onClick = {() => (dispatch(selectProduct(product.id)), dispatch(viewBag({view: info.category.props.view_bag.view_bag})))}>
            <div className ='product-image'style={{ backgroundImage: "url("+ product.gallery[0]+")"}}> <p>OUT OF STOCK</p> </div>
            <div className='circle_on_hover' onClick={(e) => ( dispatch(addToCart(getVariationObject(dat.category.products[index].attributes, dat.category.products[index].id, dat.category.products[index].prices, e))))}>
            <img className='add_on_hover' src={cart}></img>
            </div>
        
            <div className='product-name'>{product.name}</div>
            <div className='product-price'>{info.category.currency.symbol[info.category.currency.symbol.length - 1]}{product.prices[info.category.currency.symbol[info.category.currency.symbol.length - 2]].amount}</div>             
        </div>
       ));
}

class ProductCards extends React.Component {0
    render(){
      const productInfo= this.props;
        return (
        <div className='product-cards'>
        <LoadProducts category={productInfo}/>
         </div>
    )}
}

function mapStateToProps(state) {
  const currency = state.currency;
  const productSelected = state.product;
  return {
      
      currency,
      productSelected,
     props: state
  };
}
const mapDispatchToProps = (dispatch,state) => {
  const product = state.product;
    return {
        initialize: (all_products) => dispatch(initialize_attributes(all_products)),

        product,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCards);
