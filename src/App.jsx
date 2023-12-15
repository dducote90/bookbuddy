// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navigations from './components/Navigations';
import Books from './components/Books';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import SuccessRegi from './components/SuccessRegi';
import Homepage from './components/Homepage';
import SingleBook from './components/SingleBook';
import AboutUs from './components/AboutUs';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState(null);

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
    const attemptLogin = async () => {
      const loggedInToken = window.localStorage.getItem('token');

      if (loggedInToken) {
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        });

        setUser(response.data);
      } else {
        throw 'no token';
      }
    };

    attemptLogin();
  }, [token]);

  return (
    <>
      <h1 className='header'>
      
       Page Turner Library
      </h1>
      <Navigations user={user} />
      <Routes>
        <Route path='/aboutus'element={<AboutUs/>}/>
        <Route path="/successReg" element={<SuccessRegi />} />
        <Route path="/books" element={<Books allBooks={allBooks} error={error} user={user} token={token} />} />
        <Route path="/" element={<Homepage allbooks={allBooks} user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} setToken={setToken} token={token} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account" element={<Account user={user} setUser={setUser} setToken={setToken} token={token} allBooks={allBooks} />} />
        <Route path="/singlebook/:id" element={<SingleBook allBooks={allBooks} user={user} token={token} />} />
      </Routes>
    </>
  );
}

export default App;
