import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { Stripe } from 'stripe';


const Donate = (props: DonateProps) => {

    const stripe = useStripe();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const elements = useElements();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (error) {
            Swal.fire({
                title: "Payment Error, please check that all credit card info is correct",
                icon: 'error',
                confirmButtonText: 'Continue'
            })
            console.log('[error]', error);
        } else {
            const res = await fetch('/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, paymentMethod: paymentMethod })
            });
            const successfulPayment = await res.json();
            console.log(successfulPayment);

        }
    }

    return (
        <main className='container'>
            <section className='row mt-5 justify-content-center'>
                <div className='col-md-6'>
                    <form className='form-group p-3 border rounded-lg'>
                        <label>Name:</label>
                        <input className='form-control' value={name} onChange={e => setName(e.target.value)} />
                        <label>Amount you want to donate:</label>
                        <input className='form-control' value={amount} onChange={e => setAmount(e.target.value)} />
                        <label>Payment Info:</label>
                        <CardElement className="form-control" />
                        <button onClick={handleSubmit} className='btn btn-primary m-2'>Donate</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface DonateProps { }

export default Donate;