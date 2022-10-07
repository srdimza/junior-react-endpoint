import React from 'react';

class ProductGallery extends React.Component {
      DisplayThisImageAsLarge(src){
        document.getElementsByClassName('large_image')[0].setAttribute('src', src);
      }
  render(){
 return this.props.gallery.map((imageSrc) => (
       <img key={imageSrc} src={imageSrc} className='small_image' onClick= {() => this.DisplayThisImageAsLarge(imageSrc)}></img>
    )
 
    );
  }
}

export default ProductGallery;