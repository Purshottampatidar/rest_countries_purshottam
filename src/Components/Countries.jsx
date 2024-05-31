import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Data from "../countries.json";
import Filter from "../Components/Filter";
import SearchInput from "./SearchInput";
const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [sortPopulation, setSortPopulation] = useState("");
  const [sortArea, setSortArea] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountryData = () => {
    setLoading(true);
    setError(null);
    try {
      setCountries(Data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const regions = countries.reduce((acc, country) => {
    acc.add(country.region);
    return acc;
  }, new Set());

  const subregions = countries
    .filter((country) => country.region === selectedRegion)
    .reduce((acc, country) => {
      acc.add(country.subregion);
      return acc;
    }, new Set());

  const handleRegion = (region) => {
    setSelectedRegion(region);
    setSelectedSubregion("");
  };

  const handleSubRegion = (subregion) => {
    setSelectedSubregion(subregion);
  };

  const handleSearch = (countryName) => {
    setSearchCountry(countryName);
  };

  const handleSortPopulation = (sortValue) => {
    setSortPopulation(sortValue);
  };
  const handleSortArea = (sortValue) => {
    setSortArea(sortValue);
  };

  const filterCountries = () => {
    let filteredData = countries;

    if (searchCountry) {
      filteredData = filteredData.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }
    if (selectedRegion) {
      filteredData = filteredData.filter(
        (country) =>
          country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }
    if (selectedSubregion) {
      filteredData = filteredData.filter(
        (country) =>
          country.subregion.toLowerCase() === selectedSubregion.toLowerCase()
      );
    }
    if (sortPopulation) {
      filteredData = filteredData.sort((a, b) => {
        if (sortPopulation === "ase") {
          return a.population - b.population;
        } else if (sortPopulation === "dsc") {
          return b.population - a.population;
        }
      });
    }
    if (sortArea) {
      filteredData = filteredData.sort((a, b) => {
        if (sortArea === "ase") {
          return a.area - b.area;
        } else if (sortArea === "dsc") {
          return b.area - a.area;
        }
      });
    }
    return filteredData;
  };
  const sortArray = ["ase", "dsc"];
  const finalData = filterCountries();
  return (
    <>
      <div className="filter">
        <SearchInput onSearch={handleSearch} />
        <Filter onSelect={handleRegion} target={regions} filterBy={"Region"} />
        <Filter
          onSelect={handleSubRegion}
          target={subregions}
          filterBy={"SubRegion"}
        />
        <Filter
          onSelect={handleSortPopulation}
          target={sortArray}
          filterBy={"Population"}
        />
        <Filter
          onSelect={handleSortArea}
          target={sortArray}
          filterBy={"Area"}
        />
      </div>
      <section className="country-grid">
        {isLoading ? (
          <h1 className="loading">loading...</h1>
        ) : error ? (
          <div>error : {error}</div>
        ) : finalData.length === 0 ? (
          <div>No results found</div>
        ) : (
          finalData.map((country) => {
            const countryName = country.name.common;
            const region = country.region;
            const population = country.population;
            const capital = country.capital;
            const flag = country.flags.png;
            const ccn3 = country.ccn3;
            const idArray = country.tld;
            let idstring;
            if (idArray) {
              const id = idArray[0];
              idstring = id.slice(1);
            }
            return (
              <Link key={countryName} to={`country/${countryName}`}>
                <article className="article">
                  <div>
                    <img src={flag} alt={countryName} />
                    <div className="content">
                      <h2 className="country-name">{countryName}</h2>
                      <h4>
                        Population: <span>{population}</span>
                      </h4>
                      <h4>
                        Region: <span>{region}</span>
                      </h4>
                      <h4>
                        Capital: <span>{capital}</span>
                      </h4>
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
