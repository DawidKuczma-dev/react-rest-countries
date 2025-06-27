import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CountryDetails.css';
import CountryHeader from '../../components/CountryHeader/CountryHeader.jsx';
import CountryGeography from '../../components/CountrySections/CountryGeography.jsx';
import CountryCurrencies from '../../components/CountrySections/CountryCurrencies.jsx';
import CountryAdditional from '../../components/CountrySections/CountryAdditional.jsx';
import CountryPopulation from '../../components/CountrySections/CountryPopulation.jsx';
import CountryLanguages from '../../components/CountrySections/CountryLanguages.jsx';
import CountryTraffic from '../../components/CountrySections/CountryTraffic.jsx';
import CountryContact from '../../components/CountrySections/CountryContact.jsx';
import Weather from '../../components/Weather/Weather.jsx';
import CountryMaps from '../../components/CountrySections/CountryMaps.jsx';

const CountryDetails = () => {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      });

    fetch('https://restcountries.com/v3.1/all?fields=name,cca3')
      .then((res) => res.json())
      .then((data) => setAllCountries(data));
  }, []);

  if (loading) return <p>Ładowanie danych...</p>;
  if (!country) return <p>Nie znaleziono kraju</p>;

  const getBorderCountryName = () => {
    if (!country?.borders || allCountries.length === 0) return [];

    return country.borders.map((borderCode) => {
      const match = allCountries.find((country) => country.cca3 === borderCode);
      return match?.name?.common || borderCode;
    });
  };

  const gini = country.gini
    ? `${Object.values(country.gini)[0]} (${Object.keys(country.gini)[0]})`
    : null;

  const currenciesList = country.currencies ? Object.entries(country.currencies) : [];
  const languageList = country.languages ? Object.values(country.languages) : [];

  const lat = country.capitalInfo?.latlng?.[0];
  const lon = country.capitalInfo?.latlng?.[1];

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  return (
    <div className="country-details">
      <button onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>Wróć
      </button>
      <CountryHeader
        name={country.name.common}
        officialName={country.name.official}
        flag={country.flags.svg}
        coatOfArms={country.coatOfArms.svg}
      />
      <div className="info">
        <CountryGeography
          continent={country.region}
          region={country.subregion}
          capital={country.capital}
          landlocked={country.landlocked}
          area={country.area}
          borders={getBorderCountryName}
          timezones={country.timezones}
        />
        <CountryCurrencies currencies={currenciesList} />
        <CountryPopulation
          population={country.population}
          demonyms={country.demonyms?.eng?.m}
          gini={gini}
        />
        <CountryLanguages languages={languageList} />
        <CountryTraffic signs={country.car.signs} side={country.car.side} />
        <CountryContact
          root={country.idd.root}
          suffixes={country.idd.suffixes}
          tld={country.tld}
          postalCode={country.postalCode.format}
        />
        <CountryAdditional
          unMember={country.unMember}
          independent={country.independent}
          status={country.status}
          startOfWeek={country.startOfWeek}
        />
        <Weather capital={country.capital} lat={lat} lon={lon} apiKey={apiKey} />
        <CountryMaps
          googleMaps={country.maps.googleMaps}
          openStreetMaps={country.maps.openStreetMaps}
        />
      </div>
    </div>
  );
};

export default CountryDetails;
