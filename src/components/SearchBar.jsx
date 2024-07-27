import { useState } from "react";

// eslint-disable-next-line react/prop-types
function SearchBar({ onSubmit,currentSearchValue }) {
  let [searchTerm,setSearchTerm] = useState(currentSearchValue);
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search retreats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => onSubmit(searchTerm)}
      >Search</button>
    </div>
  );
}

export default SearchBar;