
import Categories from './Categories';
import React from 'react';
import ProductPage from './ProductPage';
import { connect } from "react-redux";
import { viewBag } from '../redux/actions';
import Bag from './BagItems/Bag';
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import initialize_attributes from '../redux/reducers/initialize_attributes';
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

function DetermineMainPageContent(props) {

const { loading, error, data } = useQuery( GET_PRODUCTS, {
  variables: {  
    fetchPolicy: 'no-cache',
     "input": {
    "title": 'all',
  } },
});


if (loading) return <p>Loading...</p>;
if (error) return <p>Error :</p>;


   if(props.props.productSelected.productSelected === null && props.props.view_bag === 'false' ){
    return ( <Categories data={data} />)
  }else if(props.props.productSelected.productSelected === null && props.props.view_bag === 'true'){
     return ( <Bag />)
  }else{
    return ( <ProductPage></ProductPage>)
   }
}
class MainPage extends React.Component {

  render(){
    return (
      
        <DetermineMainPageContent props={this.props} />
      
    );
  }
}

function mapStateToProps(state) {
  const productSelected = state.product;
  const view_bag = state.view_bag.view_bag;
  return {
    productSelected,
    view_bag,
  };
}
export default connect(mapStateToProps)(MainPage);
