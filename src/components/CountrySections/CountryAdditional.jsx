import './CountrySections.css';

const CountryAdditional = ({ unMember, independent, status, startOfWeek }) => {
  return (
    <section className="additional">
      <h3>Dodatkowe informacje</h3>
      <div>
        <strong>Członek ONZ: </strong>
        {unMember ? 'Tak' : unMember === false ? 'Nie' : 'Brak danych'}
      </div>
      <div>
        <strong>Niepodległy: </strong>
        {independent ? 'Tak' : independent === false ? 'Nie' : 'Brak danych'}
      </div>
      <div>
        <strong>Status: </strong>
        {status === 'officially-assigned'
          ? 'Oficjalnie uznany kraj'
          : status
          ? 'Terytorium nieoficjalne lub specjalne'
          : 'Brak danych'}
      </div>
      <div>
        <strong>Dzień rozpoczęcia tygodnia: </strong>
        {startOfWeek || 'Brak danych'}
      </div>
    </section>
  );
};

export default CountryAdditional;
