import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [inputSearch, setInputSearch] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    setInputSearch(e.target.value);
    onSearch(e.target.value);
  }
  return (
    <input
      className="input-container"
      type="text"
      onChange={(e) => handleSearch(e)}
      placeholder={"Search a country..."}
      value={inputSearch}
    />
  );
};

export default SearchInput;
