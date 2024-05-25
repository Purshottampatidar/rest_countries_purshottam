// Filter.js
import React, { useState } from 'react';

const Filter = ({ onSearch, onRegionChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onRegionChange(region);
  };

  return (
    <section className='filter'>
      <form className='form-control'>
        <input
          type='search'
          name="search"
          id="search"
          autoCapitalize='off'
          placeholder='Search for a country'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </form>
      <div className='filter-region'>
        <select name="select" id="select" className='select' value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
