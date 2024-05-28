import React, {useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';

const Country = () => {
  const [country , setCountry] = useState([]);
  const {id} = useParams();
  // console.log(countryName);

  const fetchCountryData = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const country = await response.json();
    // console.log(country);
    setCountry(country);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);
  
  return (
    <>
      <section className='country-container'>
        <Link to="/">
          <button className='back-btn'>
          <i className='fas fa-arrow-left'></i>Back
          </button>
        </Link>
        {country.map((countryData)=>{
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
          const currencies =Object.keys(currenciesObject)[0];
          const languagesObject = countryData.languages;
          const languageArray =[];
          for (const langCode in languagesObject) {
            if (languagesObject.hasOwnProperty(langCode)) {
              languageArray.push(languagesObject[langCode]);
            }
          }
          const lang = languageArray.join(' ,');
          let borderCountryArray=[];
          if(countryData.borders){
              borderCountryArray=countryData.borders;
          }
         
          // console.log(borderCountryArray);
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
                <div className='country'>
                    <img src={flag} alt={countryName} />
                    <div className='country-details'>
                      <div className='country-in-data'>
                        <div>
                          <h2 className="country-name">{countryName}</h2>
                          <h4>Native Name: <span>{nativeName}</span></h4>
                          <h4>Population: <span>{population}</span></h4>
                          <h4>Region: <span>{region}</span></h4>
                          <h4>Sub Region: <span>{subRegion}</span></h4>
                          <h4>Capital: <span>{capital}</span></h4>
                        </div>
                        <div>
                          <h4>Top Level Domain: <span>{tld}</span></h4>
                          <h4>Currencies: <span>{currencies}</span></h4>
                          <h4>Languages: <span>{lang}</span></h4>
                        </div>
                      </div>
                      <div className='country-out-data'><h4>Border Countries: </h4>
                        {borderCountryArray.map((border,index) => (
                          <button className='border-btn'  key={index}>{border}</button>
                        ))}
                      </div>
                    </div>
              </div>
             </article>
          )
        })}
      </section> 
    </>
  )
}

export default Country
