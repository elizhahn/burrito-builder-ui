import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.name) {
      this.setState({error: "We need a name for the order"});
  } else if(!this.state.ingredients.length) {
      this.setState({error:"Please select at least one ingredient"})
  } else {
    const newOrder = {
      id: Date.now(), 
      name: this.state.name, 
      ingredients: this.state.ingredients
    }
    this.props.sendOrder(newOrder);
  }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleNameChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  handleIngredientChange = (event) => {
    event.preventDefault();
    const { name } = event.target
    this.setState({ingredients: [...this.state.ingredients, name]})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }
        {this.state.error && <p>{this.state.error}</p>}
        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
