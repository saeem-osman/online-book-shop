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
      <Container>
        <Row>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100" width={900} height={300}
              src="/images/slides/picture1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
        </Row>
          <Row>
              <Cart />
          </Row>
          <Row style={{display: 'flex' , marginTop: "15px"}}>
            {bookList}
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
