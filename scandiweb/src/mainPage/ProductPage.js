import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { connect } from "react-redux";
import ProductGallery from './ProductGallery';
import ProductSelectOptions from './ProductSelectOptions';

const GET_PRODUCT_BY_ID = gql`
query Category($productId: String!) {
  product(id: $productId) {
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
function RenderProduct(props){
  const product_id = props.props.productSelected.productSelected;
  const { loading: prod_loading, error: prod_error, data: prod_data } = useQuery( GET_PRODUCT_BY_ID, {
    variables: { 
      "productId": product_id,
      fetchPolicy: 'no-cache',
   },
  });
  const { loading: cat_load, error: cat_error, data: cat_data } = useQuery( GET_PRODUCTS, {
    variables: {  
        fetchPolicy: 'no-cache',
         "input": {
        "title": 'all',
      } },
  });
  if (prod_loading) return <p>Loading...</p>;
  if (prod_error) return <p>Error :</p>;
  if (cat_load) return <p>Loading...</p>;
  if (cat_error) return <p>Error :</p>;
 return (
<div className="product_page_inner">
  <div className='product_gallery'>
        <div className='small_images'>
        <ProductGallery gallery = {prod_data.product.gallery}/>
        </div>
        <img src={prod_data.product.gallery[0]} className='large_image'></img>
  </div>
  <div className='product_select_options'>
         <ProductSelectOptions all_products={cat_data.category.products} product_info={prod_data.product} productSelected={props.props.productSelected}/>
  </div>
   </div>
 );
 }
class ProductPage extends React.Component {
  render(){
    const product_info = this.props;
    return (

      <div className="product_page_outer">
             <RenderProduct props={product_info}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency;
  const productSelected = state.product;

  return {
  
      currency,
      productSelected,
  };
}
export default connect(mapStateToProps)(ProductPage);