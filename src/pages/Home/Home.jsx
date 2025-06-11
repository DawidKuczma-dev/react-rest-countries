import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CountryCard from '../../components/CountryCard/CountryCard.jsx';

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
        <CountryCard
          key={country.cca3}
          flag={country.flags.svg}
          name={country.name.common}
          region={country.region}
          capital={country.capital?.[0] || 'Brak'}
        />
      ))}
    </div>
  );
};

export default Home;
