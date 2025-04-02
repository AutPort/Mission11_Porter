import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function AddBookPage() {
  const navigate = useNavigate();
  const { title, bookID } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price,
    };
    addToCart(newItem);
    navigate('/cart');
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
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default AddBookPage;
