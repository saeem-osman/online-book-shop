
export function booksReducer(state = {book:[]}, action){
    switch(action.type){
        case "GET_BOOK":
        return {...state, book: [...action.payload]}

        case "POST_BOOK":
        return {...state, book: [...state.book, ...action.payload], msg: 'Saved! Click to continue', 
        style: 'success', validation: 'success'
            }

        case "POST_BOOK_REJECTED":
        return {...state, msg: 'Please, try again', style: 'danger', validation: 'error' }

        case "SUBMIT_FORM":
        return {...state, msg: '', style: 'primary', validation: 'null' }
      
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