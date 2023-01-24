import React from 'react';
import coldImg from './assets/cold.jpg';

function App() {
  return (
    <div className='app' style={{ backgroundImage: `url(${coldImg})` }}>
        <div className='overlay'>
          <div className='container'>
            <div className='section section__inputs'>
              <input type='text' name='city' placeholder='Enter City...' />
              <button>°C</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>Cordoba, Ar</h3>
                <img
                  src='https://openweatherapp.org/img/wn/02d@2x.png'
                  alt='weatherIcon'
                />
                <h3>Cloudy</h3>
              </div>
              <div className='temperature'>
                <h1>32 °C</h1>
              </div>
            </div>
            {/* bottom description */}
          </div>
        </div>
      </div>
  );
}

export default App;
