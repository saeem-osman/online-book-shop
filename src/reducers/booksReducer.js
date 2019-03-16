
export function booksReducer(state = 
    {book: 
        [
            {
                _id: 0,
                title : 'This is my life',
                description: 'This is a very important book',
                price : "33.33"
            },
            {
                _id: 1,
                title : 'I love you',
                description: 'This is not an important book',
                price : "500.33"
            },
            {
                _id: 2,
                title: "LOLO",
                description: "This is lolo",
                price: "399"
            }
         ]
    }, action){
    switch(action.type){
        case "GET_BOOK":
        return {...state, book: [...state.book]}

        case "POST_BOOK":
        return {book: [...state.book, ...action.payload]}
      
        case "DELETE_BOOK":
        const allbook = [...state.book]
        const deleteBookId = allbook.findIndex(book => book._id.toString() === action.payload)
        return {book: [...allbook.slice(0, deleteBookId),
            ...allbook.slice(deleteBookId+1)
        ]} 

        case "UPDATE_BOOK":
        const bookId = [...state.book];
        const bookToUpdate = bookId.findIndex(book => book._id === action.payload._id);
        const updatedBook = {
            ...bookId[bookToUpdate],
            title: action.payload.title
        }
        return { book: [bookId.slice(0,bookToUpdate), updatedBook,
        ...bookId.slice(bookToUpdate+1)]}
        
        
    }
    return state
}