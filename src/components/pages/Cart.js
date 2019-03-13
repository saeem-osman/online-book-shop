import React, { Component } from 'react'
import {connect} from 'react-redux'
import { TabPanel, Col, Row, Container, Button, ButtonGroup, ProgressBar} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {deleteCartItem} from '../../actions'

class Cart extends Component {
    onDelete(_id){

        const currentBookToDelete = this.props.cart;
        const deleteCartId = currentBookToDelete.findIndex(cart => cart._id === _id)
        let cartAfterDelete = [...currentBookToDelete.slice(0, deleteCartId),
            ...currentBookToDelete.slice(deleteCartId + 1)
        ]
        console.log("cartAfterDelete", cartAfterDelete)

        this.props.deleteCartItem(cartAfterDelete)
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
                            <Button size='sm'variant="outline-primary">-</Button>
                            <Button size='sm'variant="outline-primary">+</Button>
                            <span>     </span>
                            <Button onClick={this.onDelete.bind(this,cartArr._id)} size="sm" variant="danger">DELETE</Button>
                        </ButtonGroup>
                    </Col>
                    </Row>
                </Container>

        )
    },this)

    return(
        <div divClassName="Cart" variant="primary">
            {cartItemList}
        </div>
    )
}
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem : deleteCartItem
        },dispatch)    
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart)