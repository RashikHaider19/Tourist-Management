// user-client/src/pages/PaymentPage.jsx
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import API from '../services/api';

// Load the publishable key from an .env or just paste your test key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_123ABC');

function PaymentPageWrapper() {
  // For demonstration, let's charge $10 (which is 1000 cents)
  const amountInCents = 1000;

  return (
    <Elements stripe={stripePromise}>
      <PaymentPage amount={amountInCents} />
    </Elements>
  );
}

function PaymentPage({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setStatus('Processing...');

    try {
      // 1. Create payment intent on the server
      const res = await API.post('/api/payments/create-payment-intent', {
        amount
      });
      const clientSecret = res.data.clientSecret;

      // 2. Confirm card payment on the frontend
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });

      if (result.error) {
        setStatus(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setStatus('Payment succeeded!');
        // For a demo, we can stop here. 
        // In a real app, you’d confirm booking or store payment details in the DB.
      }
    } catch (error) {
      console.error('Payment error:', error);
      setStatus('Payment error');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Demo Payment Page</h2>
      <p>Pay $10 with a test card:</p>
      <ul>
        <li>4242 4242 4242 4242 (any future expiry date, 123 cvc)</li>
      </ul>

      <form onSubmit={handlePayment}>
        <CardElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          style={{ marginTop: '20px' }}
        >
          Pay
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default PaymentPageWrapper;
