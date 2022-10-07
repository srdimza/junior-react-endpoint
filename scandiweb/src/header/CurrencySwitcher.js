import React from 'react'
import { connect } from "react-redux";
import { gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import { useDispatch } from 'react-redux';
import { selectCurrency } from '../redux/actions';
import vector from '../media/Vector.svg'
import OutsideClick from '../OutsideClick'
const GET_CURRENCIES = gql`
query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

function RenderAllCurrencies(){


   const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_CURRENCIES);
    if (loading) return <option>Loading...</option>;
    if (error) return <option>Loading...</option>;
    return  data.currencies.map((currency, index) => (
      <button  className='currency_option'  key = {currency.label} value={index}  onClick={() => dispatch(selectCurrency({type:'SET_CURRENCY', payload: [currency.label, index, currency.symbol]})) }>{ currency.symbol+ ' ' + currency.label}</button>
     ));
}
class CurrencySwitcher extends React.Component {
  
  constructor() {
    super();
    this.state = {
      dropdown: "none",
    };
  }
  changeDropdownState= () =>{
    if(this.state.dropdown === 'none'){
      this.setState({
        dropdown: ''
      })
    }else{
      this.setState({
        dropdown: 'none'
      })
    }

  }
  
  render() {

    const currency= this.props;
    
    return (
 
      <div className='currency_switcher'>
                <OutsideClick dropdownActive={this.state.dropdown} name={'currency_switcher'}>
                <button className='selected_currency' onClick={this.changeDropdownState} ><p>{currency.currency.symbol[currency.currency.symbol.length - 1]}</p><img src={vector} className={'arrow_up_'+this.state.dropdown}></img></button>
                
                <div className= 'dropdown' style={{"display": this.state.dropdown}}><RenderAllCurrencies /> </div>
                </OutsideClick>
                
      </div>
    )
  }
}
function mapStateToProps(state) {
    const currency = state.currency;
    return {
        
        currency
    };
  }
  export default connect(mapStateToProps)(CurrencySwitcher);

