import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  const borders = getBorderCountryName();

  const formatPopulation = (num) => {
    const formatter = new Intl.NumberFormat('pl-PL');

    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' mld';
    else if (num >= 1000000) return (num / 1000000).toFixed(1) + ' mln';
    else if (num >= 1000) return formatter.format(num);
    else return num;
  };

  return (
    <div className="country-details">
      <button onClick={() => navigate(-1)}>Wróć</button>
      <img src={country.flags.svg} alt={`Flaga ${country.name.common}`} />
      {country.coatOfArms.svg && (
        <img src={country.coatOfArms.svg} alt={`Herb ${country.name.common}`} />
      )}

      <h1>{country.name.common}</h1>
      {country.name.common !== country.name.official && <h2>{country.name.official}</h2>}

      <div>
        <strong>Kontynent: </strong>
        {`${country.region} (${country.subregion})`}
      </div>
      {country.capital && (
        <div>
          <strong>Stolica: </strong>
          {country.capital}
        </div>
      )}
      <div>
        <strong>Liczba ludności: </strong>
        {formatPopulation(country.population)}
      </div>
      {country.languages && (
        <div>
          <strong>{Object.values(country.languages).length === 1 ? 'Język' : 'Języki'}: </strong>
          {Object.values(country.languages).join(', ')}
        </div>
      )}
      {country.currencies && (
        <div>
          <strong>Waluta: </strong>
          {Object.entries(country.currencies)
            .map(([code, currency]) => `${code} - ${currency.name} (${currency.symbol})`)
            .join(', ')}
        </div>
      )}
      <div>
        <strong>Strefa czasowa: </strong>
        {country.timezones?.join(', ')}
      </div>
      {country.borders && (
        <div>
          <strong>Graniczy z: </strong>
          <ul>
            {borders.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <strong>Ruch drogowy: </strong>
        <ul>
          <li>Kod rejestracyjny: {country.car.signs?.join(', ') || 'Brak danych'}</li>
          <li>{country.car.side === 'right' ? 'Ruch prawostronny' : 'Ruch lewostronny'}</li>
        </ul>
      </div>
      <div>
        <strong>
          <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">
            Zobacz na Google Maps
          </a>
        </strong>
      </div>
    </div>
  );
};

export default CountryDetails;
