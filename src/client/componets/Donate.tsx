import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
                        <input className='form-control' value={name} onChange={e => setName(e.target.value)} />
                        <input className='form-control' value={amount} onChange={e => setAmount(e.target.value)} />
                        <CardElement className="form-control" />
                        <button onClick={handleSubmit} className='btn btn-primary'>Donate</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface DonateProps { }

export default Donate;