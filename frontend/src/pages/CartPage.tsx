import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <div>
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
        </div>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button className='btn btn-secondary'>Checkout</button>
        <button
          className='btn btn-secondary'
          onClick={() => navigate('/books')}
        >
          Continue Browsing
        </button>
      </div>
    </>
  );
}

export default CartPage;
