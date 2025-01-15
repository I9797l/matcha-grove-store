// server.js
const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_STRIPE_KEY');
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { productId } = req.body;
    const prices = {
        1: 2000,
        2: 3000,
        3: 2500,
    };
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `منتج ${productId}`,
                    },
                    unit_amount: prices[productId],
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://yourdomain.com/success',
        cancel_url: 'https://yourdomain.com/cancel',
    });
    res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));
