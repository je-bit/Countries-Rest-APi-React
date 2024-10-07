import React from "react";

interface FilterProps {
  onFilter: (region: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  return (
    <div className="custom-select">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;
