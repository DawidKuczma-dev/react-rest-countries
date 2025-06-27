import './CountrySections.css';

const CountryMaps = ({ googleMaps, openStreetMaps }) => {
  return (
    <section className="maps">
      <h3>Zobacz na: </h3>
      {googleMaps && (
        <a href={googleMaps} target="_blank" rel="noopener noreferrer">
          <strong>Google Maps</strong>
        </a>
      )}
      {openStreetMaps && (
        <a href={openStreetMaps} target="_blank" rel="noopener noreferrer">
          <strong>Open Street Map</strong>
        </a>
      )}

      {!googleMaps && !openStreetMaps && <p>Brak dostępnych map.</p>}
    </section>
  );
};

export default CountryMaps;
