import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {getBook} from '../../actions'
import {Container, Row, Button, Col, Navbar} from 'react-bootstrap'
import BookItem from './BookItem'
import BookForm from './BookForm'
import Cart from './Cart'
export class BookList extends Component {
    componentDidMount(){
        this.props.getBook();
    }
    
  render() {
    const bookList = this.props.books.map(book =>{
        return(
                <div key={book._id}>
                
                <BookItem
                    _id={book._id}
                    title={book.title}
                    description = {book.description}
                    price = {book.price}
                />
                </div>
            
        )
    })
    return (
      <Container>
          <Row>
              <Cart />
          </Row>
          
          <Row>
              <Col xs={12} sm={6}>
                <BookForm />
              </Col>
              <Col xs={12} sm={6} md={4}>
            {bookList}
            </Col>
          </Row>
      </Container>
    )
  }
}

function mapStateToProps(state){
    return{
        books : state.books.book
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBook: getBook
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
