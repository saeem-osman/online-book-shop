import Menu from './components/Menu'
import Footer from './components/Footer'

import React, { Component } from 'react'
import {connect} from 'react-redux'

export class Main extends Component {
  render() {
    return (
      <div>
        <Menu totalCartItems = {this.props.totalquantity}/>
      </div>
    )
  }
}

function mapStateToProps(state){
    return{
        totalquantity: state.cart.totalquantity
    }
}

export default connect(mapStateToProps)(Main)
