import {connect} from 'react-redux';
import React from 'react';
import {editProductVariations, setProductVariation} from '../redux/actions';

function getId(id){
  return id;
}

class AttributeButtons extends React.Component {

    FillButton(type, item){
        if(type === 'swatch'){
            return '';
        }else if(type === 'text'){
            return item.value;
        }else {
            return '';
        }
    }
    fillBackgroundColor(type, item){
        if(type === 'swatch'){
            return item.value;
        }else{
            return '';
        }
    }
  
    selectButtonSwatch(e) {

       const class_name = e.target.className;
       const id_name = e.target.id;
       if(this.props.cart_display === 'regular'){
        const  id =  this.props.indexAndId[1];
       this.props.setProductVariation(id_name, id, );
        }else if(this.props.cart_display === 'large'){
        this.props.editProductVariations(id_name, this.props.indexAndId[0], this.props.indexAndId[1]);
        }
        if(this.props.cart_display === 'large' | this.props.cart_display === 'small' ){
          
        }

       if(class_name.split('_')[0] !== 'selected'){
       const parent = e.target.parentElement;
       const all_buttons = parent.querySelectorAll('button');
       const type = class_name.split('_')[2];
       for (const button of all_buttons) {
        button.setAttribute('class', 'attribute_button_' + type)
        }
      e.target.setAttribute('class', 'selected_attribute_button_'+type );
    }
      }
      getClassName(id){
        if(this.props.cart_display === 'large' | this.props.cart_display === 'small'){ 
           for(let variation of this.props.cart.cart[this.props.indexAndId[0]].variation){
            if(variation.name === this.props.indexAndId[1] ){
              if(id === variation.variation){
          
                return "selected_attribute_button_"+this.props.type;
              }
            }
            }
        }
        return "attribute_button_"+this.props.type;
      }
  render(){
   
    return this.props.items.map((item) => (
        
        <button key={item.id} id = {item.id} onClick = { this.selectButtonSwatch.bind(this)} className={this.getClassName(item.id)}style={{"backgroundColor": this.fillBackgroundColor(this.props.type, item) }} >{this.FillButton(this.props.type, item)}</button>
   )

   );
}
}
const mapDispatchToProps = dispatch => {

    return {
        setProductVariation: (variation, id) => dispatch(setProductVariation(variation, id)),
        editProductVariations: (variation, index, id) => dispatch(editProductVariations(variation, index, id))
    }
}
function mapStateToProps(state) {
    return {
  product: state.product,
  cart : state.cart,
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(AttributeButtons);
