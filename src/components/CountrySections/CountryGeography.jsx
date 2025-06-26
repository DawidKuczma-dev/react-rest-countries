import './CountrySections.css';

const CountryGeography = ({ continent, region, capital, landlocked, area, borders, timezones }) => {
  const formatter = new Intl.NumberFormat('pl-PL');
  const bordersNames = borders();
  return (
    <section className="geography">
      <h3>Geografia</h3>
      <div>
        <strong>Kontynent: </strong>
        {continent}
        {region && ` (${region})`}
      </div>
      {capital && (
        <div>
          <strong>Stolica: </strong>
          {capital.join(', ')}
        </div>
      )}
      <div>
        <strong>Dostęp do otwartego morza: </strong>
        {landlocked ? 'Nie' : 'Tak'}
      </div>
      <div>
        <strong>Powierzchnia: </strong>
        {formatter.format(area)} km²
      </div>
      {bordersNames.length > 0 && (
        <div>
          <strong>Graniczy z: </strong>
          {bordersNames.join(', ')}
        </div>
      )}

      <div>
        <strong>{timezones.length === 1 ? 'Strafa czasowa' : 'Strefy czasowe'}: </strong>
        {timezones.join(', ')}
      </div>
    </section>
  );
};

export default CountryGeography;
