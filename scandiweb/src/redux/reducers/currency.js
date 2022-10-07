
const INITIAL_STATE = {

        currency: 'USD',
        symbol: ['USD', 0 , '$']
  }
const currency = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_CURRENCY":
           state ={
            ...state,
            currency: action.payload[0],
            symbol: action.payload[1]
           } 
        case "SET_SYMBOL":
            state ={
             ...state,
             symbol: action.payload
            } 
        break;
    }
    return state;
}

export default currency;