"use strict"
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { postBook, deleteBook, updateBook, addToCart } from './actions'
import { createLogger} from 'redux-logger'
import reducers from './reducers'
import {Provider} from 'react-redux'
//step 3: define reducers

const middleware = applyMiddleware(createLogger());


//step 1: create the store

const store = createStore(reducers, middleware);

//rendering react dom
import BookList from './components/pages/BookList'
ReactDOM.render(
    <Provider store={store}>
    <BookList />
    </Provider>,
    document.getElementById('app')
)


//step 2: create and dispathc actions

// store.dispatch(postBook(
//     [
//         {
//             id: 0,
//             title : 'Hello Bandhobi',
//             description: 'This is a very important book',
//             price : "33.33"
//         },
//         {
//             id: 1,
//             title : 'Hello Bandhu',
//             description: 'This is not an important book',
//             price : "99.33"
//         },
//         {
//             id: 2,
//             title: "LOLO",
//             description: "This is lolo",
//             price: "399"
//         }
//      ]
// ))







// store.dispatch(deleteBook(
//     {
//         id: 2
//     }
// ))

// store.dispatch(updateBook(
//     {
//         id: 2,
//         title: "MR. Macho Man"
//     }
// ))

// store.dispatch(addToCart(
//     [
//         {
//             id: 2
//         }
//     ]
// ))