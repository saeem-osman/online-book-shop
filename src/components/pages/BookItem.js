import React from 'react'
import {Card, Image,Col,Row,Button, Media} from 'react-bootstrap'
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
                images: this.props.images,
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
    constructor(){
        super();
        this.state = {
            isClicked: false
        }
    }

    onReadMore(){
        this.setState({isClicked: true})
    }

    render(){
        return(
            <Card>
                <Row>
                    <Col>
                    <Col>
                    {/* <Image src={this.props.images} bsPrefix="imageContent" /> */}
                    <Media>
                        <img
                            width={300}
                            height={450}
                            src={this.props.images}
                            alt="Book picture"
                            style={{backgroundSize: '100%'}}
                        />
                    </Media>
                    </Col>
                    <div className="bookItem">
                    <Col>
                        <h4><b>{this.props.title}</b></h4>
                        <p>
                        {/* {(this.props.description.length > 0 && this.state.isClicked === false)?
                        this.props.description.subString(0,50):this.props.description} */}
                        {this.props.description}

                        <button className="link" onClick={this.onReadMore.bind(this)}>
                        {(this.props.description.length> 50 && this.props.description !== null && this.state.isClicked === false)?
                        ('...read more'):('')}
                        </button>
                        </p>
                        <h6>$ {this.props.price}</h6>
                        <Button variant='primary' onClick={this.handleCart.bind(this)}>Buy Now</Button>
                    </Col>
                    
                    </div>
                    </Col>
                </Row>
            </Card>
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