import './Filters.css';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

const Filters = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className="filters">
      {regions.map((region) => (
        <button
          key={region}
          className={selectedRegion === region ? 'active' : ''}
          onClick={() => onRegionChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default Filters;
