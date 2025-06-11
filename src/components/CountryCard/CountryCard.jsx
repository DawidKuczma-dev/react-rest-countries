import { useNavigate } from 'react-router-dom';
import './CountryCard.css';

const CountryCard = ({ flag, name, region, capital }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/country/${name}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
      <img src={flag} alt={`Flaga ${name}`} className="country-flag" />
      <h3 className="country-name">{name}</h3>
      <p>
        <strong>Kontynent: </strong>
        {region}
      </p>
      <p>
        <strong>Stolica: </strong>
        {capital}
      </p>
    </div>
  );
};

export default CountryCard;
