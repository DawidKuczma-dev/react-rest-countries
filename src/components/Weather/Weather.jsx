import { useEffect, useState } from 'react';
import Wind from '../Wind/Wind';

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

  if (loading) return <div>Ładowanie danych pogodowych...</div>;
  return (
    <>
      <h3>Pogoda w {capital}</h3>
      <div>
        <strong>Temperatura: </strong>
        {weather.main.temp.toFixed(1)} °C
      </div>
      <Wind speed={weather.wind.speed} deg={weather.wind.deg} />
      <div>
        <strong>Ciśnienie: </strong>
        {weather.main.pressure}hPa
      </div>
      <div>
        <strong>Wilgotność: </strong>
        {weather.main.humidity}%
      </div>
      <div>
        <strong>Opis: </strong>
        {weather.weather[0].description}
      </div>
      <div>
        <strong>Widoczność: </strong>
        {weather.visibility / 1000} km
      </div>
    </>
  );
};

export default Weather;
