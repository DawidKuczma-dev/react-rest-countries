import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=cca3,flags,name,region,capital')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Błąd pobierania danych:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie danych...</p>;

  return (
    <div className="countries">
      {countries.map((country) => (
        <div key={country.cca3}>
          <img src={country.flags.svg} alt={`Flaga ${country.name.common}`} />
          <h2>{country.name.common}</h2>
          <p>Kontynent: {country.region}</p>
          <p>Stolica: {country.capital}</p>
          <Link to={`/country/${country.name.common}`}>Zobacz szczegóły →</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
