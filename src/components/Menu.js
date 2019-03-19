"use strict"
import React, { Component } from 'react'
import {Nav,NavItem, Navbar, Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCart} from '../actions'
import { bindActionCreators } from 'redux';

export class Menu extends Component {
  componentDidMount(){
    this.props.getCart();
  }
  render() {
    return (
    <Navbar inverse fixedTop expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Home Page</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavItem eventKey={1}><Link to="/about">Home Page</Link></NavItem>
              <NavItem eventKey={2}><Link to="/contacts">Contact Us</Link></NavItem>
            </Nav>
            <Nav pullRight>
            <NavItem eventKey={1}><Link to="/admin">Admin</Link></NavItem>
            <NavItem eventKey={2}><Link to="/cart"></Link>
                Your Cart {(this.props.totalCartItems>0)?(<Badge className="badge">{this.props.totalCartItems}</Badge>): ''}
            </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

    )
  }
}

function mapStateToProps(state){
  return {
    totalQuantity: state.cart.totalquantity
  }
}

function mapDispatchToProps(dispatch){
  return (
    bindActionCreators({
      getCart: getCart
    },dispatch)
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)
