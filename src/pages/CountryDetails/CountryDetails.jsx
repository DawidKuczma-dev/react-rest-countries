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

  const formatter = new Intl.NumberFormat('pl-PL');

  const formatPopulation = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' mld';
    else if (num >= 1000000) return (num / 1000000).toFixed(1) + ' mln';
    else if (num >= 1000) return formatter.format(num);
    else return num;
  };

  return (
    <div className="country-details">
      <button onClick={() => navigate(-1)}>Wróć</button>

      {/* Nazwa i flaga */}
      <section>
        <img src={country.flags.svg} alt={`Flaga ${country.name.common}`} />
        {country.coatOfArms.svg && (
          <img src={country.coatOfArms.svg} alt={`Herb ${country.name.common}`} />
        )}

        <h1>{country.name.common}</h1>
        {country.name.common !== country.name.official && <h2>{country.name.official}</h2>}
      </section>

      {/* Lokalizacja i geografia */}
      <section>
        <h3>Geografia</h3>
        <div>
          <strong>Kontynent: </strong>
          {country.region}
          {country.subregion && ` (${country.subregion})`}
        </div>
        {country.capital && (
          <div>
            <strong>Stolica: </strong>
            {country.capital.join(', ')}
          </div>
        )}
        <div>
          <strong>Dostęp do otwartego morza: </strong>
          {country.landlocked ? 'Nie' : 'Tak'}
        </div>
        <div>
          <strong>Powierzchnia: </strong>
          {formatter.format(country.area)} km²
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
          <strong>{country.timezones.length === 1 ? 'Strafa czasowa' : 'Strefy czasowe'}: </strong>
          {country.timezones?.join(', ')}
        </div>
      </section>
      {/* Ludność i społeczeństwo*/}
      <section>
        <h3>Ludność</h3>
        <div>
          <strong>Liczba ludności: </strong>
          {formatPopulation(country.population)}
        </div>
        <div>
          <strong>Określenie narodowościowe: </strong>
          {country.demonyms?.eng?.m}
        </div>
        {country.gini && (
          <div>
            <strong>Wskaźnik nierówności GINI: </strong>
            {`${Object.values(country.gini)[0]} (${Object.keys(country.gini)[0]})`}
          </div>
        )}
      </section>
      {/* Języki */}
      <section>
        {country.languages && (
          <>
            <h3>{Object.values(country.languages).length === 1 ? 'Język' : 'Języki'}</h3>
            <div>{Object.values(country.languages).join(', ')}</div>
          </>
        )}
      </section>
      {/* Waluty */}
      <section>
        {country.currencies && (
          <>
            <h3>{Object.entries(country.currencies).length === 1 ? 'Waluta' : 'Waluty'}</h3>
            <div>
              {Object.entries(country.currencies)
                .map(([code, currency]) => `${code} - ${currency.name} (${currency.symbol})`)
                .join(', ')}
            </div>
          </>
        )}
      </section>
      {/* Ruch drogowy */}
      <section>
        <h3>Ruch drogowy:</h3>
        <div>
          <strong>Kod rejestracyjny:</strong> {country.car.signs?.join(', ') || 'Brak danych'}{' '}
        </div>
        <div>
          <strong>Ruch: </strong>
          {country.car.side === 'right' ? 'prawostronny' : 'lewostronny'}
        </div>
      </section>
      {/* Kontakt */}
      <section>
        <h3>Informacje kontaktowe</h3>
        {country.idd.root && (
          <div>
            <strong>Kod telefoniczny: </strong>
            {country.idd.root}
            {country.idd.suffixes[0]}
            {country.idd.suffixes.length > 1 && ` (wszystkich jest ${country.idd.suffixes.length})`}
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
      {/* Mapy */}
      <section>
        <h3>Mapy - zobacz na: </h3>

        <div>
          <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">
            <strong>Google Maps</strong>
          </a>
        </div>
        <div>
          <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">
            <strong>Open Street Map</strong>
          </a>
        </div>
      </section>
      {/* Inne */}
      <section>
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
    </div>
  );
};

export default CountryDetails;
