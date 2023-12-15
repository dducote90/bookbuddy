//Account.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, setUser, setToken, token, allBooks }) => {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [returnError, setReturnError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCheckedOutBooks = async () => {
      const loggedInToken = window.localStorage.getItem('token')
      try {
        const response = await axios.get(
          'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loggedInToken}`,
            },
          }
        );
            console.log(response)
        setCheckedOutBooks(response.data.reservation);
        
      } catch (error) {
        console.error('Error fetching checked-out books:', error);
        
      }
    };

    fetchCheckedOutBooks();
  }, [token]);

  const handleReturn = async (reservationId) => {
    const loggedInToken = window.localStorage.getItem('token')
    try {
      const response = await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
     
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          },
        }
      );

      console.log(response.data);

      navigate('/books');
    } catch (error) {
      console.error('Error returning the book:', error);
      setReturnError('Error returning the book. Please try again.');
    }
  };
  
 
  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    setUser({});
    navigate('/');
  };

  if (!user.books) {
    return null;
  }

  return (
    <div>
      <h1>My Account</h1>
      <button onClick={() => logout()}>Logout</button>
      <hr />
        <div>
          <h2>User: {user.firstname}</h2>
          <h2>Checked Out Books</h2>
          <ul>
            {checkedOutBooks.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <button onClick={() => handleReturn(book.id)}>Return</button>
              </li> 
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Account;