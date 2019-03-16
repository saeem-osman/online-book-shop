export function getBook(){
    return{
        type: "GET_BOOK",
    }
}

export function postBook(book){
    return{
        type: "POST_BOOK",
    payload: book
    }
}

export function updateBook(book){
    return{
        type: "UPDATE_BOOK",
        payload: book
    }
}

export function deleteBook (_id){
    return{
        type: "DELETE_BOOK",
        payload: _id
    }
}

export function addToCart (book){

    return{
        type: "ADD_TO_CART",
        payload: book
    }
}

export function deleteCartItem (cart){

    return{
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}
//update to cart
export function updateCart (_id,unit){

    return{
        type: "UPDATE_CART",
        _id: _id,
        unit: unit

    }
}

