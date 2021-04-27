import React, { Component } from 'react';
import './App.css';
import {getOrders, submitOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super() 
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => {
      this.setState({orders: [...this.state.orders, ...data.orders]})
    })
      .catch(err => {
        this.setState({error: "There was a problem getting all orders, try again later"})
      });
  }

  sendOrder = (newOrder) => {
    submitOrder(newOrder)
    .then(order => {
      this.setState({orders: [...this.state.orders, order]})
    })
    .catch(error => {
      this.setState({error: "There was a problem processing your order"})
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm sendOrder={this.sendOrder}/>
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
