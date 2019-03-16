"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, BrowserRouter } from 'react-router-dom'
import { postBook, deleteBook, updateBook, addToCart } from './actions'
import { createLogger} from 'redux-logger'
import reducers from './reducers'
import {Provider} from 'react-redux'

import BookForm from './components/pages/BookForm'
import Cart from './components/pages/Cart'
import Main from './Main'
import Menu from './components/Menu'
import Footer from './components/Footer'
const middleware = applyMiddleware(createLogger());


//step 1: create the store

const store = createStore(reducers, middleware);

//rendering react dom
import BookList from './components/pages/BookList'

const Routes = (
    <Provider store={store}>
        <BrowserRouter>
        <div>
            <Main />
            <Route path="/" exact component={BookList} />
            <Route path="/admin" component={BookForm} />
            <Route path="/cart" component={Cart} />
            <Footer />
        </div>

        </BrowserRouter>
    </Provider>
)


ReactDOM.render(
    Routes,
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