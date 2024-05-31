import React, { useState, useEffect } from "react";
import countriesData from "../countries.json";
import { Link, useParams } from "react-router-dom";
const Country = () => {
  const [country, setCountry] = useState([]);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const country = countriesData.filter(
        (country) => country.name.common === id
      );
      setCountry(country);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <>
      <section className="country-container">
        <Link to="/">
          <button className="back-btn">
            <i className="fas fa-arrow-left"></i>Back
          </button>
        </Link>
        {isLoading ? (
          <h1 className="loading">loading...</h1>
        ) : error ? (
          <div>error : {error}</div>
        ) : (
          country.map((countryData) => {
            const countryName = countryData.name.common;
            const region = countryData.region;
            const population = countryData.population;
            const capital = countryData.capital;
            const flag = countryData.flags.png;
            const subRegion = countryData.subregion;
            const tld = countryData.tld[0];
            // console.log(tld);
            // console.log(country);
            const currenciesObject = countryData.currencies;
            // console.log(currenciesObject);
            const currencies = Object.keys(currenciesObject)[0];
            const languagesObject = countryData.languages;
            const languageArray = [];
            for (const langCode in languagesObject) {
              if (languagesObject.hasOwnProperty(langCode)) {
                languageArray.push(languagesObject[langCode]);
              }
            }
            const lang = languageArray.join(" ,");
            let borderCountryArray = [];
            if (countryData.borders) {
              borderCountryArray = countryData.borders;
            }
            let borderCountry = [];
            if (borderCountryArray.length > 0) {
              borderCountry = borderCountryArray.map((countryCode) => {
                return countriesData.find((country) => {
                  return country.cca3 === countryCode;
                });
              });
            }
            // console.log(borderCountry);
            let borderCountryName = [];
            borderCountryName = borderCountry.map((country) => {
              return country.name.common;
            });
            // console.log(borderCountryName)

            let nativeName;
            // console.log(country);
            for (const lang in countryData.name.nativeName) {
              if (countryData.name.nativeName.hasOwnProperty(lang)) {
                nativeName = countryData.name.nativeName[lang].common;
                break;
              }
            }
            // console.log(nativeName);

            return (
              <article key={tld}>
                <div className="country">
                  <img src={flag} alt={countryName} />
                  <div className="country-details">
                    <div className="country-in-data">
                      <div>
                        <h2 className="country-name">{countryName}</h2>
                        <h4>
                          Native Name: <span>{nativeName}</span>
                        </h4>
                        <h4>
                          Population: <span>{population}</span>
                        </h4>
                        <h4>
                          Region: <span>{region}</span>
                        </h4>
                        <h4>
                          Sub Region: <span>{subRegion}</span>
                        </h4>
                        <h4>
                          Capital: <span>{capital}</span>
                        </h4>
                      </div>
                      <div>
                        <h4>
                          Top Level Domain: <span>{tld}</span>
                        </h4>
                        <h4>
                          Currencies: <span>{currencies}</span>
                        </h4>
                        <h4>
                          Languages: <span>{lang}</span>
                        </h4>
                      </div>
                    </div>
                    <div className="country-out-data">
                      <h4>Border Countries: </h4>
                      {borderCountryName.length === 0 ? (
                        <button className="border-btn">
                          No border countries
                        </button>
                      ) : (
                        borderCountryName.map((name, index) => (
                          <button className="border-btn" key={index}>
                            {name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </>
  );
};

export default Country;
