import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

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
                  {item.title}: ${item.price.toFixed(2)}
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
        <h3>Total: </h3>
        <button>Checkout</button>
        <button onClick={() => navigate('/books')}>Continue Browsing</button>
      </div>
    </>
  );
}

export default CartPage;
