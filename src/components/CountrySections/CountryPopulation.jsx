const CountryPopulation = ({ population, demonyms, gini }) => {
  const formatter = new Intl.NumberFormat('pl-PL');
  const formatPopulation = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' mld';
    else if (num >= 1000000) return (num / 1000000).toFixed(1) + ' mln';
    else if (num >= 1000) return formatter.format(num);
    else return num;
  };
  return (
    <section className="population">
      <h3>Ludność</h3>
      <div>
        <strong>Liczba ludności: </strong>
        {formatPopulation(population)}
      </div>
      {demonyms && (
        <div>
          <strong>Określenie narodowościowe: </strong>
          {demonyms}
        </div>
      )}
      {gini && (
        <div>
          <strong>Wskaźnik nierówności GINI: </strong>
          {gini}
        </div>
      )}
    </section>
  );
};

export default CountryPopulation;
