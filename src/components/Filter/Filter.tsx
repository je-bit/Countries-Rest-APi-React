import React from "react";

interface FilterProps {
  onFilter: (region: string) => void;
}

const REGIONS = [
  {
    value: "",
    label: "Filter by Region",
  },
  {
    value: "Africa",
    label: "Africa",
  },
  {
    value: "Americas",
    label: "Americas",
  },
  {
    value: "Asia",
    label: "Asia",
  },
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Oceania",
    label: "Oceania",
  },
];

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  return (
    <div className="custom-select">
      <select onChange={(e) => onFilter(e.target.value)}>
        {REGIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
