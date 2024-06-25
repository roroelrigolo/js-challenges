import React from 'react';

import Footer from '../components/layout/footer';

import AppRouter from './router';


const App: React.FC = () => {
  return (
    <div>
      <div className='content'>
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};

export default App;
