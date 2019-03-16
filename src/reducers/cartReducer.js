export function cartReducer(state={cart:[]}, action){
    switch(action.type){
        case "ADD_TO_CART" : 
            return {...state,
                  cart: action.payload,
                  totalAmount: totals(action.payload).amount,
                  totalquantity: totals(action.payload).quantity
                }
        
        case "UPDATE_CART" :
            const cartId = [...state.cart]
            const cartIndex = cartId.findIndex( cart => cart._id === action._id)
            const updateToCart = {...cartId[cartIndex],
                    quantity: cartId[cartIndex].quantity + action.unit
            }
            let cartUpdate = [...cartId.slice(0,cartIndex), updateToCart,
                ...cartId.slice(cartIndex+1)]

            return {...state, 
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalquantity: totals(cartUpdate).quantity
            }
            
        case "DELETE_CART_ITEM" : 
        return {...state, 
            cart: action.payload,
            totalquantity: totals(action.payload).quantity
        }
    }
    return state;
}


//calculate total amount

export function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a,b){
        return a+b;
    },0) // starting from index 0

    const totalQty = payloadArr.map(function(cartArr){
        return cartArr.quantity
    }).reduce(function(a,b){
        return a+b;
    },0)

    return { amount: totalAmount.toFixed(2), quantity: totalQty }
}