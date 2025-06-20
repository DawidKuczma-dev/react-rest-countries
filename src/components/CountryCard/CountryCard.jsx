import { useNavigate } from 'react-router-dom';
import './CountryCard.css';

const CountryCard = ({ id, flag, name, region, capital }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/country/${id}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
      <img src={flag} alt={`Flaga ${name}`} className="country-flag" />
      <div></div>
      <h3 className="country-name">{name}</h3>
      <div className="country-info">
        <p>
          <strong>Kontynent: </strong>
          {region}
        </p>
        <p>
          <strong>Stolica: </strong>
          {capital}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
