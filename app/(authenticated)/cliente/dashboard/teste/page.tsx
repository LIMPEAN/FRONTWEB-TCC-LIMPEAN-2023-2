"use client"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51O35p9I2iHRH36N7EJU6K5RaZbf2gYCrTzZCdd5wD5zKBvWFQ64cr6IDTeSNLoclGFc3wEmU0XYWNV14B1J9AV3000EqG4FMk1');

const StripeButton = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    // Chame sua rota de criação de sessão do Stripe aqui
    const response = await fetch('/api/criar-sessao-stripe', {
      method: 'POST',
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      // Caso ocorra algum erro durante o redirecionamento para o checkout
      console.error(result.error.message);
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Comprar
    </button>
  );
};

export default StripeButton;
