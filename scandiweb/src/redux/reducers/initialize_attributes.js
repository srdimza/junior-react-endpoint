

const initialize_attributes = (state = {category_all: null}, action) => { 
    switch(action.type) {

        case "INITIALIZE":
            if(state.category_all === null){

         
            state ={
             ...state,
            
             category_all: action.payload.category_all
            }  
        }else{
            return state
        }
         default:
          return state;
     }
    }
    

export default initialize_attributes;