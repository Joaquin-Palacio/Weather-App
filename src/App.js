import React, { useEffect, useState } from 'react';
import coldImg from './assets/cold.jpg';
import hotImg from './assets/hot.jpg';
import { Descriptions } from './components/Descriptions';
import { getWeatherData } from './WeatherService';

function App() {
  const [city, setCity] = useState('Córdoba');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotImg);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      // dinamic background
      const threshold = units === 'metric' ? 20 : 60;
      if(data.temp <= threshold) setBg(coldImg)
      else setBg(hotImg);
    };

    fetchData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City...' />
              <button onClick={(e) => handleUnitsClick(e)}>°C</button>
            </div>
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`} </h3>
                <img src={weather.iconURL} alt='weatherIcon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} °${
                  units === 'metric' ? 'C' : 'F'
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}

            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
