import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, i) => {
    return (
      <div key={i} className="order" data-cy="order-card">
        <h3 className="order-name">{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section className="orders">
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;