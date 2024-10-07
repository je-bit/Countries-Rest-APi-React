import React from "react";
import { Link } from "react-router-dom";
import "./cardsStyle.scss";

interface CardProps {
  country: {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
  };
}

const Card: React.FC<CardProps> = ({ country }) => {
  return (
    <div className="card">
      <Link to={`/country/${country.name}`}>
        <img src={country.flag} alt={country.name} className="card__image" />
      </Link>
      <div className="card__content">
        <h3>{country.name}</h3>
        <p>
          <span>Population: </span> {country.population.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {country.region}
        </p>
        <p>
          <span>Capital:</span> {country.capital}
        </p>
      </div>
    </div>
  );
};
export default Card;
