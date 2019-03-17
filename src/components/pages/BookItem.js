import React from 'react'
import {Container,Col,Row,Button} from 'react-bootstrap'
import {addToCart, updateCart} from '../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class BookItem extends React.Component{
    handleCart(){
        const book = [...this.props.cart,
            {
                _id: this.props._id,
                title: this.props.title,
                description: this.props.description,
                price: this.props.price,
                quantity: 1
            }
        ]
        
        if(this.props.cart.length > 0){
            let _id = this.props._id;
            const cartIndex = this.props.cart.findIndex(cart => cart._id === _id)
            if(cartIndex === -1){
                this.props.addToCart(book)
            }else{
                this.props.updateCart(_id,1,this.props.cart)

            }
        }else{
            this.props.addToCart(book)
        }
        
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col xs={12}>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.description}</p>
                        <h6>$ {this.props.price}</h6>
                        <Button variant='primary' onClick={this.handleCart.bind(this)}>Buy Now</Button>
                    </Col>
                </Row>
            </Container>
        )
    }1
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return(
        bindActionCreators({addToCart, updateCart},dispatch)
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem)