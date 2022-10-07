import { useQuery, gql } from '@apollo/client';
import Header from './header/Header';
import MainPage from './mainPage/MainPage';
import React from 'react';

class App extends React.Component {
  render(){
    return (
      <div>
        <Header />
        <MainPage />
      </div>
    );
  }
}

export default App;