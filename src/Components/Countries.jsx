import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import { Link } from 'react-router-dom';
// const url = 'https://restcountries.com/v3.1/all';
const Countries = ({countriesData}) => {
  const [countries, setCountries] = useState(countriesData);
  // const [countries ,setCountries] = useState(data);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [subRegions, setSubRegions] = useState([]);
  const [sortedCountry,setSortedCountry] = useState([]);
  const [isLoading ,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  //  console.log(countriesData);
/*-------------------------------fetching data from the url----------------------------- */
  const fetchCountryData =  () => {
    setLoading(true);
    setError(null);
    try{
      // const response = await fetch(url);
      // const countriesData = await response.json();
      setCountries(countriesData);
      setFilteredCountries(countriesData);
    }catch(error){
       setError(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

//----------------------------------filtering search , selectedRegion , selected sub Region-----------------------------//
  const filterCountries = () => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedSubRegion) {
      filtered = filtered.filter((country) =>
        country.subregion === selectedSubRegion
      );
    } else if (selectedRegion) {
      filtered = filtered.filter((country) =>
        country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    setFilteredCountries(filtered);
  };

  useEffect(() => {
    filterCountries();
  }, [search, selectedRegion, selectedSubRegion]);


//------------------------------------search function---------------------------------------------------//
  const handleSearch = (query) => {
    setSearch(query);
  };


//-----------------------------------filter Region---------------------------------------------------//
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedSubRegion('');
    const subRegionsSet = new Set();
    countries.forEach((country) => {
      if (country.region.toLowerCase() === region.toLowerCase()) {
        subRegionsSet.add(country.subregion);
      }
    });
    setSubRegions(Array.from(subRegionsSet));
  };

//----------------------------------filter sub region -------------------------------------------//
  const handleSubRegionChange = (subRegion) => {
    setSelectedSubRegion(subRegion);
  };


/*----------------------------------------sorting countries by populations wise---------------------- */
  const handleSortCountry = (sort)=>{
      setSortedCountry(sort);
      if(sortedCountry){
        filterSortPopulation(sortedCountry,filteredCountries);
      }else{
        setFilteredCountries(filteredCountries);
      }
  }

  const filterSortPopulation = (sort , filteredCountries)=>{
      if(sort==='ascending'){
         const filtered = filteredCountries.slice().sort((a,b)=>a.population - b.population);
         setFilteredCountries(filtered);
      }else{
         const filtered = filteredCountries.slice().sort((a,b)=>b.population - a.population);
         setFilteredCountries(filtered);
      }
  }


/*---------------------------------------sorting countries by area wise--------------------------- */
  const handleSortArea=(sort)=>{
    if(sort){
      filterSortArea(sort,filteredCountries);
    }else{
      setFilteredCountries(filteredCountries);
    }
  }
  const filterSortArea = (sort , filteredCountries)=>{
    if(sort==='ascending'){
       const filtered = filteredCountries.slice().sort((a,b)=>a.area - b.area);
       setFilteredCountries(filtered);
    }else{
       const filtered = filteredCountries.slice().sort((a,b)=>b.area - a.area);
       setFilteredCountries(filtered);
    }
  }
  
  return (
    <>
      <Filter
        onSearch={handleSearch}
        onRegionChange={handleRegionChange}
        onSubRegionChange={handleSubRegionChange}
        subRegions={subRegions}
        onSortCountry={handleSortCountry}
        onSortArea={handleSortArea}
      />
      <section className='country-grid'>
        {isLoading ? (
          <h1 className='loading'>loading...</h1>
        ):error ? (<div>error : {error}</div>)
        : filteredCountries.length === 0 ? (
          <div>No results found</div>
        ):(
         filteredCountries.map((country) => {
          const countryName = country.name.common;
          const region = country.region;
          const population = country.population;
          const capital = country.capital;
          const flag = country.flags.png;
          const ccn3= country.ccn3;
          const idArray =country.tld;
          let idstring;
          if(idArray){
              const id = idArray[0];
              idstring= id.slice(1);
          }
          return (
            <Link key={countryName} to={`country/${countryName}`}>
            <article className='article' >
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
            </Link>
          );
        })
      )}
      </section>
    </>
  );
};

export default Countries;
