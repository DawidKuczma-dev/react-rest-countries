import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, searchBy, onToggleSearchBy }) => {
  return (
    <div className="search-bar">
      <input
        id="useless-but-needed-id"
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={`Szukaj ${searchBy === 'name' ? 'państwa' : 'stolicy'}`}
      />
      <button onClick={onToggleSearchBy}>
        {searchBy === 'name' ? 'Szukaj stolicy' : 'Szukaj państwa'}
      </button>
    </div>
  );
};

export default SearchBar;
