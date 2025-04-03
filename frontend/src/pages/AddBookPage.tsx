import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function AddBookPage() {
  const navigate = useNavigate();
  const { title, bookID, price, quantity } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity: Number(quantity),
    };

    addToCart(newItem);

    // Navigate to the cart page and pass a toast message
    navigate('/cart', { state: { toastMessage: `Added "${title}" to cart!` } });
  };

  return (
    <>
      <h2>{title}</h2>
      <p>Price: {price}</p>
      <div>
        {/* display price */}
        {/* <input
          type='number'
          placeholder='Enter donation amount'
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        /> */}
        <button className='btn btn-success' onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>

      <button className='btn btn-secondary' onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
}

export default AddBookPage;
