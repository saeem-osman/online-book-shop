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

export function deleteBook (id){
    return{
        type: "DELETE_BOOK",
        payload: id
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

