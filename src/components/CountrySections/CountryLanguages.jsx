import './CountrySections.css';

const CountryLanguages = ({ languages }) => {
  return (
    <section className="languages">
      <h3>{languages.length < 2 ? 'Język' : 'Języki'}</h3>
      <div>{languages.length > 0 ? languages.join(', ') : 'Brak danych'}</div>
    </section>
  );
};

export default CountryLanguages;
