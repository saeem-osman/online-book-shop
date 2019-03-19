import React, { Component } from 'react'
import { InputGroup, DropdownButton, Dropdown, Image, Col, Row ,Container, Form, Card, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { postBook, deleteBook, getBook, resetForm } from '../../actions'
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
        images: findDOMNode(this.refs.images).value,
        price: findDOMNode(this.refs.price).value,
      }]
      this.props.postBook(book);
      
    }

    handleSelect(img){
      this.setState({
        img: '/images/'+ img
      })
    }

    resetFormData() {
       this.props.resetForm();
       findDOMNode(this.refs.title).value = '',
       findDOMNode(this.refs.description).value = '',
       findDOMNode(this.refs.images).value = '',
       findDOMNode(this.refs.price).value = '',
       this.setState({img: ''})
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
       onClick={this.handleSelect.bind(this, imgArr.name)}   >{imgArr.name}</Dropdown.Item>
      )
    },this)
    

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <InputGroup>
                <FormControl type="text" ref="images" value={this.state.img}/>
                <DropdownButton id="dropdown-basic-button" title="Select an image" variant="primary">
                  {imgList}
                </DropdownButton>;
              </InputGroup>
              <Image src={this.state.img} rounded/>
            </Card>
          </Col>
          <Col>
            <Card>
                <FormGroup controlId="title" bsPrefix={this.props.validation} >
                  <FormLabel>Title</FormLabel>
                  <FormControl
                      type="text"
                      placeholder="Enter Title"
                      ref="title" />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="description" bsPrefix={this.props.validation}>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                      type="text"
                      placeholder="Enter Description"
                      ref="description" />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="price" bsPrefix ={this.props.validation}>
                  <FormLabel>Price</FormLabel>
                  <FormControl
                      type="text"
                      placeholder="Enter price"
                      ref="price" />
                      <Form.Control.Feedback />
                </FormGroup>
                <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetFormData.bind(this))}
                variant={!(this.props.style)? "primary": (this.props.style)}
                >
                {!(this.props.msg)?("Save Book"):(this.props.msg)}
                </Button>
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
    books: state.books.book,
    msg: state.books.msg,
    style : state.books.style,
    validation: state.books.validation
  }
}

function mapDispatchToprops(dispatch){
    return(
        bindActionCreators({postBook, deleteBook, getBook, resetForm},dispatch)
    )
}
export default connect(mapStateToProps,mapDispatchToprops)(BookForm)
