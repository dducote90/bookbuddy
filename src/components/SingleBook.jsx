//SingleBook.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleBook = ({ allBooks, user }) => {
  const params = useParams();
  const bookId = params.id * 1;

  const [selectedBook, setSelectedBook] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const book = allBooks.find((book) => book.id === bookId);
    setSelectedBook(book);
  }, [allBooks, bookId]);

  
  const handleCheckout = async () => {
    const loggedInToken = window.localStorage.getItem('token')
    try {
      const response = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {

          available: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          },
        }
      );

      console.log(response.data);

      navigate('/account'); 
    } catch (error) {
      console.error('Error checking out the book:', error);
      setCheckoutError('Error checking out the book. Please try again.');
    }
  };

if (!selectedBook) {
    return <div className='single-book-error'>No book found for the given ID.</div>;
  }

  return (
    <div>
      <h1 className='single-book-title'>Single Book</h1>
      <div className='single-book-container' key={selectedBook.id}>
        <h3>{selectedBook.title}</h3>
        <p>Author: {selectedBook.author}</p>
        <p>Description: {selectedBook.description}</p>
        <img src={selectedBook.coverimage} alt={selectedBook.title} />
        <p>Available: {selectedBook.available ? 'Yes' : 'No'}</p>
     </div>
      {user.email && (
        <div className='single-book-actions'>
          <button onClick={handleCheckout} className='checkout-button'>Checkout</button>
         
          <Link to="/" className='go-back-link'>Go Back</Link>
         </div>
      )}      
      {checkoutError && <div className='checkout-error'>{checkoutError}</div>}
    </div>
  );
};

export default SingleBook;