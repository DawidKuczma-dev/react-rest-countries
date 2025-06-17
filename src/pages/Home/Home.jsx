import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CountryCard from '../../components/CountryCard/CountryCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');

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

  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  const handleToggleSearchBy = () => {
    setSearchBy((prev) => (prev === 'name' ? 'capital' : 'name'));
  };

  const filteredCountries = countries.filter((country) => {
    if (searchBy === 'name')
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    else return country.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="wrapper">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchTerm}
        searchBy={searchBy}
        onToggleSearchBy={handleToggleSearchBy}
      />
      <div className="countries">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            flag={country.flags.svg}
            name={country.name.common}
            region={country.region}
            capital={country.capital?.[0] || 'Brak'}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
