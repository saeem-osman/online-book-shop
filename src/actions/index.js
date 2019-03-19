import axios from 'axios'

export function getBook(){
    return function(dispatch){
        axios.get('/api/books')
            .then(function(response){
                dispatch({type: "GET_BOOK", payload: response.data})
            })
            .catch(function(err){
                dispatch({type: "GET_BOOK_REJECTED", payload: err})
            })
    }
    
    
    // return{
    //     type: "GET_BOOK",
    // }
}

export function postBook(book){
    return function(dispatch){
        axios.post('/api/books', book)
            .then(function(response){
                dispatch({type: "POST_BOOK", payload: response.data})
            })
            .catch(function(err){
                dispatch({type: "POST_BOOK_REJECTED", payload: "There was an error while posting a new book"})
            })
    }

    // return{
    //     type: "POST_BOOK",
    // payload: book
    // }
}

export function updateBook(book){
    return{
        type: "UPDATE_BOOK",
        payload: book
    }
}

export function resetForm(){
    return{
        type: "SUBMIT_FORM",
    }
}

export function deleteBook (_id){
    return function(dispatch){
        axios.delete('/api/books/' + _id)
            .then(function(response){
                dispatch({type: "DELETE_BOOK", payload: _id})
            })
            .catch(function(err){
                dispatch({type: "DELETE_BOOK_REJECTED", payload: "Something wrong with deleting"})
            })
    }

    // return{
    //     type: "DELETE_BOOK",
    //     payload: _id
    // }
}

export function getCart(){
    return function(dispatch){
        axios.get('/api/cart')
            .then(function(response){
                dispatch({type: "GET_CART", payload: response.data});
            })
            .catch(function(err){
                dispatch({type: "GET_CART_REJECTED", msg: "Error while getting cart information"})
            })
    }
}

export function addToCart (cart){

    return function(dispatch){
        axios.post('/api/cart', cart)
            .then(function(response){
                dispatch({type: "ADD_TO_CART", payload: response.data})
            })
            .catch(function(err){
                dispatch({type: "ADD_TO_CART_REJECTED", msg: 'error occured at the time of adding item to cart'})
            })
    }

    // return{
    //     type: "ADD_TO_CART",
    //     payload: book
    // }
}

export function deleteCartItem (cart){

    return function(dispatch){
        axios.post('/api/cart', cart)
            .then(function(response){
                dispatch({type: "DELETE_CART_ITEM", payload: response.data})
            })
            .catch(function(err){
                dispatch({type: "DELETE_CART_ITEM_REJECTED", msg: 'error occured at the time of deleting item to cart'})
            })
    }

    // return{
    //     type: "DELETE_CART_ITEM",
    //     payload: cart
    // }
}
//update to cart
export function updateCart (_id,unit,cart){

    const cartId = cart;
    const cartIndex = cartId.findIndex( cart => cart._id === _id)
    const updateToCart = {...cartId[cartIndex],
            quantity: cartId[cartIndex].quantity + unit
    }
    let cartUpdate = [...cartId.slice(0,cartIndex), updateToCart,
        ...cartId.slice(cartIndex+1)]

        return function(dispatch){
            axios.post('/api/cart', cartUpdate)
                .then(function(response){
                    dispatch({type: "UPDATE_CART", payload: response.data})
                })
                .catch(function(err){
                    dispatch({type: "UPDATE_CART_REJECTED", msg: 'error occured at the time of adding item to cart'})
                })
        }

    // return{
    //     type: "UPDATE_CART",
    //     payload: cartUpdate

    // }
}

