export function cartReducer(state={cart:[]}, action){
    switch(action.type){
        case "ADD_TO_CART" : 
            return {...state,  cart: action.payload}
            
        case "DELETE_CART_ITEM" : 
        return {...state, cart: action.payload}
    }
    return state;
}
