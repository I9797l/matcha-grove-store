// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('YOUR_PUBLIC_STRIPE_KEY');

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            const session = await response.json();
            await stripe.redirectToCheckout({ sessionId: session.id });
        });
    });
});
