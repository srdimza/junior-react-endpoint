import React, {useState} from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import '../styles.css'
import { useSelector, useDispatch } from 'react-redux';
import {selectCategory} from '../redux/actions';
import logo from '../media/a-logo.png';
import CurrencySwitcher from './CurrencySwitcher';
import { connect } from "react-redux";
import {makeSelectedProductNull} from '../redux/actions'
import {viewBag} from '../redux/actions';
import {} from '../redux/actions/index'
import Cart from './Cart'

const GET_CATEGORIES = gql`
query GetCategories {
      categories {
        name
      }
    } 
`;
function IsSelected(this_name, selected_name){
  if(this_name === selected_name){
    return "selected_category";
  }else{
    return "not_selected_category"
  }
}
function DisplayCategories(selected_cat){
const dispatch = useDispatch();
const { loading, error, data } = useQuery(GET_CATEGORIES);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :</p>;
return  data.categories.map((category) => (
  <li className= {IsSelected(category.name, selected_cat.selected_cat.category)}key = {category.name} ><a href = '#' onClick={() => (dispatch(selectCategory({type:'SET_CATEGORY', payload:category.name})), dispatch(makeSelectedProductNull()), dispatch(viewBag({view: 'false'})))}>{category.name} </a></li>
 ));
}

class Header extends React.Component {

  render(){
   const selected_category = this.props.category;
    return (
      <div className='header'> <ul className="nav-bar">
           <DisplayCategories selected_cat={selected_category}  />
           </ul>
        <img src={logo}style={{'cursor': 'pointer'}} onClick = {() => (this.props.makeSelectedNull(), this.props.viewBag({view: 'false'}))}/>
        <CurrencySwitcher/>
        <Cart/> 
      </div>
    )
  }
}
function mapStateToProps(state) {
  const category = state.category;
  return {
      
      category
  };
  
}
function  mapDispatchToProps(dispatch){
  return {
    makeSelectedNull: () => dispatch(makeSelectedProductNull()),
    viewBag: (bag) => dispatch(viewBag(bag)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

