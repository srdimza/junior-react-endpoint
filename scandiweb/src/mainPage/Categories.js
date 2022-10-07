import React from 'react';
import ProductCards from './ProductCards';
import { connect } from "react-redux";



class Categories extends React.Component {
  
  render(){
  
  const category = this.props.category.category;

    return (
      <div className='categories-page'>
          <h2 className = 'title'>{category}</h2>
          <div className='full-screen-cart-open' style={{"display": 'none'}}></div>
          <ProductCards selectedCategory = {category}/>
            
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

export default connect(mapStateToProps)(Categories);