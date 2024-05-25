// Countries.js
import React, { useState, useEffect } from 'react';
import Filter from './Filter';

const url = 'https://restcountries.com/v3.1/all';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const fetchCountryData = async () => {
    const response = await fetch(url);
    const countriesData = await response.json();
    setCountries(countriesData);
    setFilteredCountries(countriesData);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const handleSearch = (searchQuery) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedRegion) {
      filterByRegion(selectedRegion, filtered);
    } else {
      setFilteredCountries(filtered);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region) {
      filterByRegion(region, countries);
    } else {
      setFilteredCountries(countries);
    }
  };

  const filterByRegion = (region, countryList) => {
    const filtered = countryList.filter((country) =>
      country.region.toLowerCase() === region.toLowerCase()
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <Filter onSearch={handleSearch} onRegionChange={handleRegionChange} />
      <section className='country-grid'>
        {filteredCountries.map((country) => {
          const countryName = country.name.common;
          const region = country.region;
          const population = country.population;
          const capital = country.capital;
          const flag = country.flags.png;
          console.log(country);
          return (
            <article key={countryName}>
              <div>
                <img src={flag} alt={countryName} />
                <div className="content">
                  <h2 className="country-name">{countryName}</h2>
                  <h4>Population: <span>{population}</span></h4>
                  <h4>Region: <span>{region}</span></h4>
                  <h4>Capital: <span>{capital}</span></h4>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Countries;
