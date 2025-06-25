import Wind from './details/Wind/Wind.jsx';

const WeatherDetails = ({ weather }) => {
  return <Wind speed={weather.wind.speed} deg={weather.wind.deg} />;
};

export default WeatherDetails;
