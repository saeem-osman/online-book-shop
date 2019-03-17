import React, { Component } from 'react'
import { InputGroup, DropdownButton, Dropdown, Image, Col, Row ,Container, Form, Card, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { postBook, deleteBook } from '../../actions'
import {findDOMNode} from 'react-dom'
import axios from 'axios'

export class BookForm extends Component {
  constructor(){
    super();
    this.state = {
      images: [],
      img: ''
    }
  }
    // componentDidMount(){
    //   axios.get('/api/images')
    //     .then(function(response){
    //       this.setState({images: response.data})
    //     }.bind(this))
    //     .catch(function(err){
    //       this.setState({images: 'error loading image data', img: ''})
    //     })
    // }

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

    let bookList = this.props.books.map((bookArr)=>{
      return(
        <option key={bookArr._id}>{bookArr._id}</option>
      )
    })

    const imgList = this.state.images.map(function(image,i){
      return(
        <Dropdown.Item key={i} eventKey={image.name}>{image.name}</Dropdown.Item>
      )
    },this)

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <InputGroup>
                <FormControl type="text" ref="image" value=""/>
                <DropdownButton id="dropdown-basic-button" title="Select an image" variant="primary">
                  
                </DropdownButton>;
              </InputGroup>
              <Image src="" rounded/>
            </Card>
          </Col>
          <Col>
            <Card>
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
            </Card>
            <Card>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select a book to delete</Form.Label>
                <Form.Control ref="delete" as="select">
                  <option value="select">Select</option>
                  {bookList}
                </Form.Control>
              </Form.Group>
              <Button onClick={this.onDelete.bind(this)} variant="danger">Delete Book</Button>
              </Form>
          </Card>
          </Col>
        </Row>
          
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
