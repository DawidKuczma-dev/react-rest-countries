import { useState } from 'react';
import './CountryHeader.css';

const CountryHeader = ({ name, officialName, flag, coatOfArms }) => {
  const [loadingArms, setLoadingArms] = useState(true);
  return (
    <section className="header">
      <h1>{name}</h1>
      {name !== officialName && <h2>{officialName}</h2>}
      <div className="header__images">
        <div className="header__flag">
          <img src={flag} alt={`Flaga ${name}`} />
        </div>

        {coatOfArms && (
          <div className="header__arms">
            {loadingArms && <p>Ładowanie herbu...</p>}
            <img src={coatOfArms} alt={`Herb ${name}`} onLoad={() => setLoadingArms(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryHeader;
