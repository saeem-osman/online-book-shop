import React, { Component } from 'react'
import {connect} from 'react-redux'
import { TabPanel, Modal, Col, Row, Container, Button, ButtonGroup, ProgressBar} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {deleteCartItem,updateCart,getCart} from '../../actions'
import {modalStyle} from './modalStyle'

class Cart extends Component {
    componentDidMount(){
        this.props.getCart();
    }
    onDelete(_id){

        const currentBookToDelete = this.props.cart;
        const deleteCartId = currentBookToDelete.findIndex(cart => cart._id === _id)
        let cartAfterDelete = [...currentBookToDelete.slice(0, deleteCartId),
            ...currentBookToDelete.slice(deleteCartId + 1)
        ]
        console.log("cartAfterDelete", cartAfterDelete)

        this.props.deleteCartItem(cartAfterDelete)
    }
    constructor(){
        super();
        this.state = {
            showModal: false
        }
    }
    open(){
        this.setState({showModal: true})
    }
    close(){
        this.setState({showModal: false})
    }

  render() {
    if(this.props.cart[0]){
        return this.renderCart();
    }else {
        return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(
        <div>I am empty now</div>
    )
}

onIncrement(_id){
    this.props.updateCart(_id,1,this.props.cart)
}
onDecrement(_id,quantity){
    if(quantity>1){
        this.props.updateCart(_id,-1, this.props.cart);
    }
}

renderCart(){
    const cartItemList = this.props.cart.map(cartArr =>{
        return(
                <Container key={cartArr._id}>
                    <Row>
                    <Col xs={12} sm={4}>
                        <h6>{cartArr.title}</h6><span>    </span>
                    </Col>
                    <Col xs={12} sm={2}>
                        <h6>$. {cartArr.price}</h6>
                    </Col>
                    <Col xs={12} sm={2}>
                        <h6>qty. <ProgressBar variant="warning" now={100} style={{width:'15px'}}>{cartArr.quantity}</ProgressBar> </h6>
                    </Col>
                    <Col xs={6} sm={4}>
                        <ButtonGroup style={{minWidth: '300px'}}>
                            <Button onClick={this.onDecrement.bind(this,cartArr._id, cartArr.quantity)} size='sm'variant="outline-primary">-</Button>
                            <Button onClick={this.onIncrement.bind(this,cartArr._id)} size='sm'variant="outline-primary">+</Button>
                            <span>     </span>
                            <Button onClick={this.onDelete.bind(this,cartArr._id)} size="sm" variant="danger">DELETE</Button>
                        </ButtonGroup>
                    </Col>
                    </Row>
                </Container>

        )
    },this)

    return(
        <Container divClassName="Cart" variant="primary">
            {cartItemList}
            <Row>
                <Col xs={12}>
                    <h6>Total Amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} variant="success" size="sm">
                            PROCEED TO CHECKOUT
                        </Button>
                </Col>
            </Row>
        <Modal
            onHide={this.close.bind(this)}
            
            aria-labelledby="modal-label"
            show={this.state.showModal}
            renderBackdrop={this.renderBackdrop}
            >
            <Modal.Header closeButton>
                <Modal.Title>Thank You :) </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <h6>Your cart has been saved</h6>
                    <p>You will recieve an email confirmation.</p>
            </Modal.Body>
            <Modal.Footer>
                <Col xs={6}>
                    <p>Total amount $. {this.props.totalAmount}</p>
                </Col>
                <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>

        </Container>
    )
}
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount : state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem : deleteCartItem,
        updateCart: updateCart,
        getCart: getCart
        },dispatch)    
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart)