import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideClick extends Component {
  constructor(props) {
    super(props);
    
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  closeDropdown(){

    if(this.props.name === 'currency_switcher'){


    document.getElementsByClassName('dropdown')[0].style.display = 'none';
    const arrow = document.getElementsByClassName('arrow_up_')[0].click();
  }else if(this.props.name === 'small-cart'){
    document.getElementsByClassName('cart_dropdown')[0].style.display = 'none';
    document.getElementsByClassName('full-screen-cart-open')[0].style.display = 'none';
  }
    /*
    arrow.classList.remove('arrow_up_');
    arrow.setAttribute('class', 'arrow_up_none');
 */
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.props.dropdownActive != 'none') {
      this.closeDropdown();
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}