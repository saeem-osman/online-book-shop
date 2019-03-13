import React, { Component } from 'react'
import { Container, TabPane, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { postBook } from '../../actions'
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
  render() {
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
      </Container>
    )
  }
}

function mapDispatchToprops(dispatch){
    return(
        bindActionCreators({postBook},dispatch)
    )
}
export default connect(null,mapDispatchToprops)(BookForm)
