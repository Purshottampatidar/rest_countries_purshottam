// Filter.js
import React, { useState } from 'react';

const Filter = ({ onSearch, onRegionChange, onSubRegionChange, subRegions ,onSortCountry,onSortArea}) => {


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [sortCountry,setSortCountry] = useState('');
  const [sortArea,setSortArea] = useState('');

/*----------------------handle search function--------------------------------- */
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };
/*----------------------handle region function---------------------------------- */
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedSubRegion('');
    onRegionChange(region);
  };
/*---------------------handle sub region function------------------------------- */
  const handleSubRegionChange = (e) => {
    const subRegion = e.target.value;
    setSelectedSubRegion(subRegion);
    onSubRegionChange(subRegion);
  };

  const handleSortCountry=(e)=>{
     const sort = e.target.value;
     setSortCountry(sort);
     onSortCountry(sort);
  }

  const handleSortArea=(e)=>{
    const sort = e.target.value;
    setSortArea(sort);
    onSortArea(sort);
 }
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
        <select name="select-region" id="select-region" className='select' value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className='filter-region'>
        <select name="select-subregion" id="select-subregion" className='select' value={selectedSubRegion} onChange={handleSubRegionChange}>
          <option value="">Filter by Subregion</option>
          {subRegions.map((subregion, index) => (
            <option key={index} value={subregion}>{subregion}</option>
          ))}
        </select>
      </div>
      <div className='filter-region'>
         <select name="sort-by-population" id='sort-by-population' className='select' value={sortCountry} onChange={handleSortCountry}>
            <option value="">Filter by Populations</option>
            <option value="ascending">Ascending order</option>
            <option value="descending">Descending order</option>
         </select>
      </div>
      <div className='filter-region'>
         <select name="sort-by-area" id='sort-by-area' className='select' value={sortArea} onChange={handleSortArea}>
            <option value="">Filter by Area</option>
            <option value="ascending">Ascending order</option>
            <option value="descending">Descending order</option>
         </select>
      </div>
    </section>
  );
};

export default Filter;
