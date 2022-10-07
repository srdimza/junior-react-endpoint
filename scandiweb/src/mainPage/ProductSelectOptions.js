import { useQuery, gql } from '@apollo/client';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import React from 'react';
import {connect} from 'react-redux';
import { addToCart, selectProduct } from '../redux/actions';
import {} from '../redux/actions/index'
import { useDispatch } from 'react-redux';
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
function SizeSelectorWithAttributes(props){
  let real_attributes = [];
  real_attributes = props.data.product_info.attributes;
  return ( <SizeSelector  attributes={ real_attributes} cart_display ={'regular'}/>)

}
class ProductSelectOptions extends React.Component {
 filterVariations(variations, id , prices, product_id, attributes){
  this.props.addToCart(
{ variation: variations, id: id, prices:prices, attributes: attributes, qty:1}
  )
 }
  render(){
    const data = this.props;
    const product_index = this.props.state.currency.symbol[1];
    const new_variations = this.props.productSelected.variations
    const id = this.props.product_info.id;
    const prices = this.props.product_info.prices;
    const attributes = this.props.product_info.attributes;
   return (
      <div>
        <p className="product_brand_name">{data.product_info.brand}</p>
        <p className="product_name">{ data.product_info.name}</p>

        <SizeSelectorWithAttributes data = {this.props} />
        
        <p className = 'product_price'>Price:<br></br><br></br>{data.product_info.prices[product_index].currency.symbol + data.product_info.prices[product_index].amount}</p>
        <button className='add_to_cart_button' onClick={() => this.filterVariations(new_variations, id, prices, data.product_info.id, attributes)}>Add to cart</button>
       <div className='product_description' dangerouslySetInnerHTML={{__html:data.product_info.description}}></div>
       </div>
    );
  }
}

const mapDispatchToProps = (dispatch,state) => {
  const product = state.product;
    return {
        addToCart: (variation, id) => dispatch(addToCart(variation, id)),
        selectProduct: (id) => dispatch(selectProduct(id)),

        product,
    }
}

function mapStateToProps(state) {
    return {
    
state,
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ProductSelectOptions);