//Homepage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Books from './Books'; 

const Homepage = ({allBooks, user}) => {
 

  return (
    <div className="homepage-container">
    
{<div>
    <Books user={user}/>
  
</div>}


      
    </div>
  );
};

export default Homepage;
