import React from 'react';
import AppRouter from './router';
import Footer from '../components/layout/footer';

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
