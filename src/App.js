import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import UserCard from './components/UserCard/UserCard';
import Model from './components/Model/Model';
import Loader from './components/Loader/Loader';
import Friend from './components/Friend/Friend';
import Filter from './components/Filter/Filter';
import Error from './components/Error/Error';

function App() {
  return (
    <div>
      <NavBar/>
      <UserCard/>
      <Model/>
      <Loader/>
      <Friend/>
      <Filter/>
      <Error/>
    </div>
  );
}

export default App;
