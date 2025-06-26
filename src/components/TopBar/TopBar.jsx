import Filters from '../../components/Filters/Filters.jsx';
import './TopBar.css';

const TopBar = ({
  resultCount,
  sortOption,
  onSortChange,
  selectedRegion,
  onRegionChange,
  onRandomClick,
}) => {
  return (
    <div className="top-bar">
      <h1>Liczba wyników: {resultCount} </h1>
      <div className="select-container">
        <select
          id="useless-but-needed-id1"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value={'name-asc'}>Alfabetycznie A-Z</option>
          <option value={'name-desc'}>Alfabetycznie Z-A</option>
        </select>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <Filters selectedRegion={selectedRegion} onRegionChange={onRegionChange} />
      <button className="random-button" onClick={onRandomClick}>
        🎲 Losowe państwo 🎲
      </button>
    </div>
  );
};

export default TopBar;
