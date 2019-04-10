import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {getBook} from '../../actions'
import { Carousel, Row, Button, Col, Navbar, Card, Container} from 'react-bootstrap'
import BookItem from './BookItem'
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
                    images = {book.images}
                    price = {book.price}
                />
                </div>
            
        )
    })
    return (
      <div>
      <Container>
        <Row>
              <Cart />
          </Row>
        <Row>
          <Col xs={12} sm md>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100" width={900} height={300}
              src="/images/slides/picture1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Your trusted Bookshop</h3>
              <p>Buy premium books at a cheaper price.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height = {300}
              width={900}
              src="/images/slides/picture2.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Enjoy 50% sale on selected books.</h3>
              <p>Go with feedom</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height = {300}
              width={900}
              src="/images/slides/picture1.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Col>
        </Row>
        </Container>
        <Container>
          
          <Row>
            {bookList}
          </Row>
      </Container>
      </div>
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
