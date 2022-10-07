import React from 'react';
import AttributeButtons from './AttributeButtons';
class SizeSelector extends React.Component {

  render(){
    return this.props.attributes.map((attribute) => (

     <div key={attribute.id + attribute.items[0].id} className={attribute.id + '_attribute'}>
           <h3>{attribute.id +':'}</h3>
          <AttributeButtons items={attribute.items} type={attribute.type}  cart_display={this.props.cart_display} indexAndId={[this.props.index, attribute.id]}/>
     </div>
   )

   );
  }
}

export default SizeSelector;