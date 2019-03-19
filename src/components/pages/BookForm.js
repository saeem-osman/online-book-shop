import React, { Component } from 'react'
import { InputGroup, DropdownButton, Dropdown, Image, Col, Row ,Container, Form, Card, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { postBook, deleteBook,getBook } from '../../actions'
import {findDOMNode} from 'react-dom'
import axios from 'axios'

export class BookForm extends Component {
  constructor() {
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }
    componentDidMount = async ()=> {
      this.props.getBook();
      axios.get('/api/images')
        .then(function(response){
          this.setState({images: response.data})
        }.bind(this))
        .catch(function(err){
          this.setState({images: 'error loading image data', img: ''})
        }.bind(this))
    }
      

    //   axios.get('/api/images')
    //     .then(function(response){
    //       this.setState({images: response.data})
    //     }.bind(this))
    //     .catch(function(err){
    //       this.setState({images: 'error loading image data', img: ''})
    //     }.bind(this))
    // }

    handleSubmit(){
      const book=[{
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        price: findDOMNode(this.refs.price).value,
      }]
      this.props.postBooks(book);
    }

    handleSelect(img){
      this.setState({
        img: '/images/'+ img
      })
    }

    onDelete(){
      let bookId = findDOMNode(this.refs.delete).value
      this.props.deleteBook(bookId);
    }

  render() {

    const booksList = this.props.books.map(function(booksArr){
      return (
        <option key={booksArr._id}> {booksArr._id}</option>
      )
    })

    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <Dropdown.Item key={i} eventKey={imgArr.name}
          >{imgArr.name}</Dropdown.Item>
      )
    })
    

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <InputGroup>
                <FormControl type="text" ref="image" value=""/>
                <DropdownButton id="dropdown-basic-button" title="Select an image" variant="primary">
                  {imgList}
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
                  {booksList}
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
        bindActionCreators({postBook, deleteBook, getBook},dispatch)
    )
}
export default connect(mapStateToProps,mapDispatchToprops)(BookForm)
