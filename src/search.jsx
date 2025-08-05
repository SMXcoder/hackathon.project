


function SearchBar() {
  return (
    <div className="search-section">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search Stock Symbol (e.g., AAPL)"
          className="search-input"
        />
      </div>
    </div>
  );
}

export default SearchBar;

