import './CountrySections.css';

const CountryTraffic = ({ signs, side }) => {
  return (
    <section className="traffic">
      <h3>Ruch drogowy</h3>
      <div>
        <strong>Kod rejestracyjny:</strong> {signs?.join(', ') || 'Brak danych'}{' '}
      </div>
      <div>
        <strong>Ruch: </strong>
        {side === 'right' ? 'prawostronny' : side === 'left' ? 'lewostronny' : 'Brak danych'}
      </div>
    </section>
  );
};

export default CountryTraffic;
