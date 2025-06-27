import './CountrySections.css';

const CountryCurrencies = ({ currencies }) => {
  return (
    <section className="currencies">
      <h3>{currencies.length < 2 ? 'Waluta' : 'Waluty'}</h3>
      {currencies.length > 0 ? (
        <ul>
          {currencies.map(([code, currency]) => (
            <li key={code}>
              <strong>{code}</strong> - {currency.name} {`(${currency.symbol})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak danych</p>
      )}
    </section>
  );
};

export default CountryCurrencies;
