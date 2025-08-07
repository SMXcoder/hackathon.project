// Home.jsx
import React from 'react';
import NNav from './newnav.jsx';
import SearchBar from './search.jsx';
import Foot from './footer.jsx';
import './newnav.css';
import './Foot.css';

function Home({ setIsLoggedIn }) {
  return (
    <div className="background">
      <NNav setIsLoggedIn={setIsLoggedIn} />
      <SearchBar />
      <Foot />
    </div>
  );
}

export default Home;
