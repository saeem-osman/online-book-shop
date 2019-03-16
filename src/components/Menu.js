"use strict"
import React, { Component } from 'react'
import {Nav,NavItem, Navbar, Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class Menu extends Component {
  render() {
    return (
    <Navbar inverse fixedTop expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Link to="/about">About</Link>
            <Link to="/contact">Contacts</Link>
            </Nav>
            <Nav pullRight>
            <Link to="/admin">Admin</Link>
            <Nav.Link eventKey={2} href="#">
                Your Cart {(this.props.totalCartItems>0)?(<Badge className="badge">{this.props.totalCartItems}</Badge>): ''}
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

    )
  }
}

export default Menu
