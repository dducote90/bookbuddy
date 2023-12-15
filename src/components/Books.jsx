// Books.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = ({ user, token }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        setAllBooks(response.data.books);
      } catch (error) {
        setError('Error fetching books. Please try again.');
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filteredBooks = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const finalResults = showAvailable ? filteredBooks.filter(book => book.available) : filteredBooks;

    setSearchResults(finalResults);
  }, [searchTerm, allBooks, showAvailable]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  return (
    <div className='books-container'>
      <h1 className='welcomemessage'>
        {user && user.firstname ? `Welcome back, ${user.firstname}!` : 'Welcome to our library!'}
      </h1>
      <h2>Our Books</h2>
      
      <div className='searchbar'>
        <p>Total Books: {allBooks.length}</p>
        <label htmlFor="search">Search by Title: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p>Results: {searchResults.length} out of {allBooks.length} books</p>
        <button onClick={handleToggleAvailable}>
          {showAvailable ? 'Show All Books' : 'Show Available Books Only'}
        </button>
      </div>
      <ul>
        {searchResults.map((book) => (
          <li className='book-item' key={book.id}>
            <Link to={`/singlebook/${book.id}`}>
              <h3>{book.title}</h3>
              <img src={book.coverimage} alt={book.title} className='book-image' />
            </Link>
            <p className='bookinfo'>Available: {book.available ? 'yes' : 'no'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;