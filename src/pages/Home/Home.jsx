import { useEffect, useState } from 'react';
import './Home.css';
import CountryCard from '../../components/CountryCard/CountryCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Filters from '../../components/Filters/Filters.jsx';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortOption, setSortOption] = useState('name-asc');

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

  const handleRegionChange = (region) => setSelectedRegion(region);

  const filteredCountries = countries.filter((country) => {
    const matchRegion = selectedRegion === 'All' || country.region === selectedRegion;

    const matchSearch =
      searchBy === 'name'
        ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        : country.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchRegion && matchSearch;
  });

  filteredCountries.sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return searchBy === 'name'
          ? a.name.common.localeCompare(b.name.common)
          : a.capital[0].localeCompare(b.capital[0]);
      case 'name-desc':
        return searchBy === 'name'
          ? b.name.common.localeCompare(a.name.common)
          : b.capital[0].localeCompare(a.capital?.[0]);
      default:
        return 0;
    }
  });

  return (
    <div className="wrapper">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchTerm}
        searchBy={searchBy}
        onToggleSearchBy={handleToggleSearchBy}
      />
      <div className="top-bar">
        <h1>Liczba wyników: {filteredCountries.length}</h1>

        <select
          id="useless-but-needed-id1"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value={'name-asc'}>Alfabetycznie A-Z</option>
          <option value={'name-desc'}>Alfabetycznie Z-A</option>
        </select>
        <Filters selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
      </div>
      <div className="countries">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            id={country.cca3}
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
