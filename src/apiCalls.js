const checkForErrors = (response) => {
  if(!response.ok) {
    throw new Error(response.status)
} else {
    return response.json(); 
}
}


export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => checkForErrors(response))
}

export const submitOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newOrder)
  })
  .then(response => checkForErrors(response))
}