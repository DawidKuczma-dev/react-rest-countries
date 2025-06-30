import { useEffect, useState } from 'react';
import WeatherDetails from './WeatherDetails.jsx';
import './Weather.css';

const Weather = ({ capital, lat, lon, apiKey }) => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pl`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Błąd pobierania pogody', err);
        setLoading(false);
      });
  }, [lat, lon, apiKey]);

  const getLocalTime = (timezone) => {
    const now = new Date();
    const utcMilliseconds = now.getTime() + now.getTimezoneOffset() * 60000;
    const localMilliseconds = utcMilliseconds + timezone * 1000;
    return new Date(localMilliseconds).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div>Ładowanie danych pogodowych...</div>;
  return (
    <section className="weather">
      {lat && lon ? (
        <>
          <h3>
            Pogoda w {capital} <p>czas lokalny: {getLocalTime(weather.timezone)}</p>
          </h3>
          <div className="temperature">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
              alt={weather.weather?.[0]?.description}
            />

            <p className="temperature__value">{weather.main?.temp?.toFixed(1)}°C</p>
            <p className="temperature__desc">{weather.weather?.[0]?.description}</p>
          </div>

          <WeatherDetails weather={weather} />
        </>
      ) : (
        <p>Brak danych o pogodzie.</p>
      )}
    </section>
  );
};

export default Weather;
