import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CountryDetails.css';
import CountryHeader from '../../components/CountryHeader/CountryHeader.jsx';
import CountryGeography from '../../components/CountrySections/CountryGeography.jsx';
import CountryPopulation from '../../components/CountrySections/CountryPopulation.jsx';
import CountryLanguages from '../../components/CountrySections/CountryLanguages.jsx';
import Weather from '../../components/Weather/Weather.jsx';

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
        <CountryPopulation
          population={country.population}
          demonyms={country.demonyms?.eng?.m}
          gini={gini}
        />
        <CountryLanguages languages={languageList} />
        {/* Waluty */}
        <section className="currencies">
          {country.currencies ? (
            <>
              <h3>{Object.entries(country.currencies).length === 1 ? 'Waluta' : 'Waluty'}</h3>
              <div>
                {Object.entries(country.currencies)
                  .map(([code, currency]) => `${code} - ${currency.name} (${currency.symbol})`)
                  .join(', ')}
              </div>
            </>
          ) : (
            <>
              <h3>Waluta</h3>
              <div>Brak danych</div>
            </>
          )}
        </section>
        {/* Ruch drogowy */}
        <section className="traffic">
          <h3>Ruch drogowy</h3>
          <div>
            <strong>Kod rejestracyjny:</strong> {country.car.signs?.join(', ') || 'Brak danych'}{' '}
          </div>
          <div>
            <strong>Ruch: </strong>
            {country.car.side === 'right' ? 'prawostronny' : 'lewostronny'}
          </div>
        </section>
        {/* Kontakt */}
        <section className="contact">
          <h3>Informacje kontaktowe</h3>
          {country.idd.root && (
            <div>
              <strong>Kod telefoniczny: </strong>
              {country.idd.root}
              {country.idd.suffixes[0]}
              {country.idd.suffixes.length > 1 &&
                ` (wszystkich jest ${country.idd.suffixes.length})`}
            </div>
          )}
          <div>
            <strong>Domena: </strong>
            {country.tld?.join(', ')}
          </div>
          {country.postalCode.format && (
            <div>
              <strong>Format kodu pocztowego: </strong>
              {country.postalCode.format}
            </div>
          )}
        </section>
        {/* Inne */}
        <section className="additional">
          <h3>Dodatkowe Informacje</h3>
          <div>
            <strong>Członek ONZ: </strong>
            {country.unMember ? 'Tak' : 'Nie'}
          </div>
          <div>
            <strong>Niepodległy: </strong>
            {country.independent ? 'Tak' : 'Nie'}
          </div>
          <div>
            <strong>Status: </strong>
            {country.status === 'officially-assigned'
              ? 'Oficjalnie uznany kraj'
              : 'Terytorium nieoficjalne lub specjalne'}
          </div>
          <div>
            <strong>Dzień rozpoczęcia tygodnia: </strong>
            {country.startOfWeek}
          </div>
        </section>
        {/* Dane pogodowe */}
        <section className="weather">
          {lat && lon ? (
            <Weather capital={country.capital} lat={lat} lon={lon} apiKey={apiKey} />
          ) : (
            <p>Brak danych o pogodzie.</p>
          )}
        </section>
        {/* Mapy */}
        <section className="maps">
          <h3>Zobacz na: </h3>

          <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">
            <strong>Google Maps</strong>
          </a>

          <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">
            <strong>Open Street Map</strong>
          </a>
        </section>
      </div>
    </div>
  );
};

export default CountryDetails;
