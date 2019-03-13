import React from 'react'
import {Container,Col,Row,Button} from 'react-bootstrap'
import {addToCart} from '../../actions'
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
        this.props.addToCart(book)
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
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return(
        bindActionCreators({addToCart},dispatch)
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem)