import './CountrySections.css';

const CountryContact = ({ root, suffixes, tld, postalCode }) => {
  return (
    <section className="contact">
      <h3>Informacje kontaktowe</h3>
      {root && suffixes.length > 0 && (
        <div>
          <strong>Kod telefoniczny: </strong>
          {root}
          {suffixes[0]}
          {suffixes.length > 1 && ` (wszystkich jest ${suffixes.length})`}
        </div>
      )}
      <div>
        <strong>Domena: </strong>
        {tld?.length > 0 ? tld.join(', ') : 'Brak danych'}
      </div>
      <div>
        <strong>Format kodu pocztowego: </strong>
        {postalCode || 'Brak danych'}
      </div>
    </section>
  );
};

export default CountryContact;
