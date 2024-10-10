import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowBack from "../assets/arrow-back.svg";
import "./CountryInfo.scss";

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  capital: string;
  subregion: string;
  topLevelDomain: string;
  currencies: Record<string, { name: string }>;
  languages: Record<string, string>;
  flag: string;
  borders: string[];
}

export const CountryInfo: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => response.json())
        .then((data) => {
          const countryData = data[0];

          let nativeName = "N/A";
          if (countryData.name.nativeName) {
            const nativeNamesObj = countryData.name.nativeName;
            const firstNativeNameKey = Object.keys(nativeNamesObj)[0];
            nativeName = nativeNamesObj[firstNativeNameKey]?.common || "N/A";
          }

          const topLevelDomain = countryData.tld ? countryData.tld[0] : "N/A";

          setCountry({
            name: countryData.name.common,
            nativeName: nativeName,
            population: countryData.population,
            region: countryData.region,
            capital: countryData.capital ? countryData.capital[0] : "N/A",
            subregion: countryData.subregion,
            topLevelDomain,
            currencies: countryData.currencies,
            languages: countryData.languages,
            flag: countryData.flags.png,
            borders: countryData.borders || [],
          });
        });
    }
  }, [countryName]);

  if (!country) {
    return <div>The Information you are looking for is not available.</div>;
  }

  return (
    <>
      <Link to={`/`} className="link-style">
        <button className="back-button">
          <img className="arrow" alt="arrow" src={arrowBack} />
          <p className="back-text">Back</p>
        </button>
      </Link>
      <div className="country-container">
        <div className="country-photo">
          <img
            src={country.flag}
            className="country-flag"
            alt={`${country.name} flag`}
          />
        </div>
        <div className="country-info">
          <h2 className="country-title">{country.name}</h2>
          <div className="country-paragraph">
            <div className="left-paragraph">
              <p>
                <span>Native Name: </span> {country.nativeName}{" "}
              </p>
              <p>
                <span>Population: </span> {country.population.toLocaleString()}
              </p>
              <p>
                <span>Region: </span> {country.region}
              </p>
              <p>
                <span>Sub Region: </span> {country.subregion}
              </p>
              <p>
                <span>Capital: </span> {country.capital}
              </p>
            </div>
            <div className="right-paragraph">
              <p>
                <span>Top Level Domain: </span>
                {country.topLevelDomain}
              </p>
              <p>
                <span>Currencies: </span>
                {Object.values(country.currencies)
                  .map((currency) => `${currency.name}`)
                  .join(", ")}
              </p>
              <p>
                <span>Languages: </span>
                {Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
          <div className="country-border">
            <h4>Border Countries:</h4>
            <div className="border-container">
              {country.borders.length > 0 ? (
                country.borders.map((border) => (
                  <div className="border-box" key={border}>
                    {border}
                  </div>
                ))
              ) : (
                <p>No border countries.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
