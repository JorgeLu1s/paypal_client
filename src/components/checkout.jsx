import React from 'react'
import axios from 'axios'

// axios.defaults.withCredentials = true

class Checkout extends React.Component {
  componentDidMount() {
    window.paypal.Buttons({
      createOrder: function(data, actions) {
        return axios.get('http://local.eargo.com:3000/api/create_paypal_transaction')
        .then(function(data) {
          console.log('data', data)
          return data.data.orderID; // Use the same key name for order ID on the client and server
        }).catch(function(error) {
          console.log('error error', error)
        });
      },
      onApprove: function(data, actions) {
        // actions.restart
        // actions.redirect
        return axios.get('http://local.eargo.com:3000/api/get_paypal_transaction', {
                         params: {
                           order_id: data.orderID
                         }})
        .then(res => console.log('transaction approved'))
        .catch(err => console.warn('something went wrong', err))
      }
    }).render('#paypal-button-container')
  }

  pay() {
    axios.get('http://local.eargo.com:3000/api/paypal')
    .then(res => console.log(res))
    .catch(err => console.warn(err))
  }

  render() {
    return (
      <div>
        <h1>Eargo Store!</h1>
        <div id="paypal-button-container"></div>
      </div>
    )
  }
}

export default Checkout
