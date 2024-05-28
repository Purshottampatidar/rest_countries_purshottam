// // Countries.js
// import React, { useState, useEffect } from 'react';
// import Filter from './Filter';
// import { Link } from 'react-router-dom';
// const url = 'https://restcountries.com/v3.1/all';

// const Countries = () => {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [selectedSubRegion, setSelectedSubRegion] = useState('');
//   const [subRegions, setSubRegions] = useState([]);
//   const [sortedCountry,setSortedCountry] = useState([]);
//   const [isLoading ,setLoading] = useState(false);
//   const [error, setError] = useState(null);
// /*-------------------------------fetching data from the url----------------------------- */
//   const fetchCountryData = async () => {
//     setLoading(true);
//     setError(null);
//     try{
//       const response = await fetch(url);
//       const countriesData = await response.json();
//       setCountries(countriesData);
//       setFilteredCountries(countriesData);
//     }catch(error){
//        setError(error);
//     }
//     finally{
//       setLoading(false);
//     }
    

//   };

//   useEffect(() => {
//     fetchCountryData();
//   }, []);
// /*----------------------------searching function---------------------------------------*/
//   const handleSearch = (searchQuery) => {
//     const filtered = countries.filter((country) =>
//       country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     if (selectedSubRegion) {
//       filterBySubRegion(selectedSubRegion, filtered);
//     } else if (selectedRegion) {
//       filterByRegion(selectedRegion, filtered);
//     } else {
//       setFilteredCountries(filtered);
//     }
//   };

// /* -------------------------------Region function-------------------------------------*/
//   const handleRegionChange = (region) => {
//     setSelectedRegion(region);
//     // console.log(region)
//     setSelectedSubRegion('');
//     if (region) {
//       filterByRegion(region,countries);
//     } else {
//       setFilteredCountries(countries);
//     }
//   };

//   const filterByRegion = (region, countryList) => {
//     const subRegionSet =new Set();
//     const filtered = countryList.filter((country) =>{
//       if(country.region.toLowerCase() === region.toLowerCase()){
//         //  console.log(country.subregion);
//         subRegionSet.add(country.subregion);
//         return country;
//       }
//     });
//     setSubRegions(Array.from(subRegionSet));
//     setFilteredCountries(filtered);
//   };

// /*-------------------------------------------sub Region function------------------------------------- */
//   const handleSubRegionChange = (subRegion) => {
//     setSelectedSubRegion(subRegion);
//     if (subRegion) {
//       filterBySubRegion(subRegion, countries);
//     } else {
//       filterByRegion(selectedRegion, countries);
//     }
//   };

//   const filterBySubRegion = (subRegion, countryList) => {
//     const filtered = countryList.filter((country) =>
//       country.subregion=== subRegion
//     );
//     // console.log(filtered);
//     setFilteredCountries(filtered);
//   };

// /*----------------------------------------sorting countries by populations wise---------------------- */
//   const handleSortCountry = (sort)=>{
//       // console.log(sort);
//       setSortedCountry(sort);
//       if(sort){
//         filterSortPopulation(sort,filteredCountries);
//       }else{
//         // console.log("when no filter selected");
//         setFilteredCountries(filteredCountries);
//       }
//   }
//   const filterSortPopulation = (sort , filteredCountries)=>{
//       // console.log(sort);
//       if(sort==='ascending'){
//         //  console.log('sorted in ascending order');
//          const filtered = filteredCountries.slice().sort((a,b)=>a.population - b.population);
//          setFilteredCountries(filtered);
//       }else{
//         //  console.log("sorted in decending order");
//          const filtered = filteredCountries.slice().sort((a,b)=>b.population - a.population);
//          setFilteredCountries(filtered);
//       }
//   }
// /*---------------------------------------sorting countries by area wise--------------------------- */
//   const handleSortArea=(sort)=>{
//     // console.log(sort);
//     if(sort){
//       filterSortArea(sort,filteredCountries);
//     }else{
//       // console.log("when no filter selected");
//       setFilteredCountries(filteredCountries);
//     }
//   }
//   const filterSortArea = (sort , filteredCountries)=>{
//     // console.log(sort);
//     if(sort==='ascending'){
//       //  console.log('sorted in ascending order');
//        const filtered = filteredCountries.slice().sort((a,b)=>a.area - b.area);
//        setFilteredCountries(filtered);
//     }else{
//       //  console.log("sorted in decending order");
//        const filtered = filteredCountries.slice().sort((a,b)=>b.area - a.area);
//        setFilteredCountries(filtered);
//     }
//   }
//   return (
//     <>
//       <Filter
//         onSearch={handleSearch}
//         onRegionChange={handleRegionChange}
//         onSubRegionChange={handleSubRegionChange}
//         subRegions={subRegions}
//         onSortCountry={handleSortCountry}
//         onSortArea={handleSortArea}
//       />
//       <section className='country-grid'>
//         {isLoading ? (
//           <div>loading...</div>
//         ):error ? (<div>error : {error}</div>)
//         : filteredCountries.length===0 ? (
//           <div>No such </div>
//         ):(
//          filteredCountries.map((country) => {
//           const countryName = country.name.common;
//           const region = country.region;
//           const population = country.population;
//           const capital = country.capital;
//           const flag = country.flags.png;
//           const cca2 = country.cca2;
//           const idArray =country.tld;
//           let idstring;
//           if(idArray){
//               const id = idArray[0];
//               idstring= id.slice(1);
//               // console.log(idstring);
//           }
//           return (
//             <Link key={countryName} to={`country/${idstring}`}>
//             <article className='article' >
//               <div>
//                 <img src={flag} alt={countryName} />
//                 <div className="content">
//                   <h2 className="country-name">{countryName}</h2>
//                   <h4>Population: <span>{population}</span></h4>
//                   <h4>Region: <span>{region}</span></h4>
//                   <h4>Capital: <span>{capital}</span></h4>
//                 </div>
//               </div>
//             </article>
//             </Link>
//           );
//         })
//       )}
//       </section>
//     </>
//   );
// };

// export default Countries;




import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import { Link } from 'react-router-dom';
const url = 'https://restcountries.com/v3.1/all';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [subRegions, setSubRegions] = useState([]);
  const [sortedCountry,setSortedCountry] = useState([]);
  const [isLoading ,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCountryData = async () => {
    setLoading(true);
    setError(null);
    try{
      const response = await fetch(url);
      const countriesData = await response.json();
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

  const filterCountries = () => {
    let filtered = countries;

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, selectedRegion, selectedSubRegion]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedSubRegion('');

    // Filter subregions based on the selected region
    const subRegionsSet = new Set();
    countries.forEach((country) => {
      if (country.region.toLowerCase() === region.toLowerCase()) {
        subRegionsSet.add(country.subregion);
      }
    });
    setSubRegions(Array.from(subRegionsSet));
  };

  const handleSubRegionChange = (subRegion) => {
    setSelectedSubRegion(subRegion);
  };

  const handleSortCountry = (sort)=>{
      setSortedCountry(sort);
      if(sort){
        filterSortPopulation(sort,filteredCountries);
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
          <div>loading...</div>
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
          const cca2 = country.cca2;
          const idArray =country.tld;
          let idstring;
          if(idArray){
              const id = idArray[0];
              idstring= id.slice(1);
          }
          return (
            <Link key={countryName} to={`country/${idstring}`}>
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
