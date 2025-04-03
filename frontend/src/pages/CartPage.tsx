import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';
import ToastNotification from '../components/ToastNotification';

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show toast message if navigated from AddBookPage
  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
    }
  }, [location.state]);

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                <p>
                  {item.title}: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p>Quantity: {item.quantity}</p>
                <button
                  className='btn btn-danger'
                  onClick={() => removeFromCart(item.bookID)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button className='btn btn-secondary'>Checkout</button>
        <button
          className='btn btn-secondary'
          onClick={() => navigate('/books')}
        >
          Continue Browsing
        </button>
      </div>

      {/* Show toast notification if message exists */}
      {toastMessage && <ToastNotification message={toastMessage} />}
    </>
  );
}

export default CartPage;
