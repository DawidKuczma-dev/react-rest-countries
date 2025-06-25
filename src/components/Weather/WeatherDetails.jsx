import Wind from './details/Wind/Wind.jsx';

const WeatherDetails = ({ weather }) => {
  return (
    <div className="weatherDetails">
      <Wind speed={weather.wind.speed} deg={weather.wind.deg} />
      <div className="pressure">
        <h4>Ciśnienie</h4>
        <span>🧭</span>
        <p>{weather.main.pressure} hPa</p>
      </div>
      <div className="humidity">
        <h4>Wilgotność</h4>
        <span>💧</span>
        <p>{weather.main.humidity} %</p>
      </div>
      {weather.visibility < 10000 && (
        <div className="visibility">
          <h4>Widoczność</h4>
          <span>🌫️</span>
          <p>{weather.visibility / 1000} km</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
