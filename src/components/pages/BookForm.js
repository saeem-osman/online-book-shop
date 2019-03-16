import React, { Component } from 'react'
import { Container, Form, TabPane, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { postBook, deleteBook } from '../../actions'
import {findDOMNode} from 'react-dom'

export class BookForm extends Component {
    handleSubmit(){
        const book = [{
            title: findDOMNode(this.refs.title).vlaue,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBook(book)
    }

    onDelete(){
      let bookId = findDOMNode(this.refs.delete).value
      this.props.deleteBook(bookId);
    }

  render() {

    let bookList = this.props.books.map(function(bookArr){
      return(
        <option key={bookArr._id}>{bookArr._id}</option>
      )
    })

    return (
      <Container>
          <TabPane>
              <FormGroup controlId="title">
                <FormLabel>Title</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Title"
                    ref="title" />
              </FormGroup>

              <FormGroup controlId="description">
                <FormLabel>Description</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Description"
                    ref="description" />
              </FormGroup>

              <FormGroup controlId="price">
                <FormLabel>Price</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter price"
                    ref="price" />
              </FormGroup>
              <Button variant="primary" onClick={this.handleSubmit.bind(this)}>Save Book</Button>
          </TabPane>
          <TabPane>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select a book to delete</Form.Label>
              <Form.Control ref="delete" as="select">
                <option value="select">Select</option>
                {bookList}
              </Form.Control>
            </Form.Group>
            <Button onClick={this.onDelete.bind(this)} variant="danger">Delete Book</Button>
            </Form>
        </TabPane>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    books: state.books.book
  }
}

function mapDispatchToprops(dispatch){
    return(
        bindActionCreators({postBook, deleteBook},dispatch)
    )
}
export default connect(mapStateToProps,mapDispatchToprops)(BookForm)
