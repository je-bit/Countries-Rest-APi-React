import React from "react";

interface SearchInputProps {
  onSearch: (term: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <img src="./src/assets/icon-search.svg" className="icon-search" />
      <input
        type="text"
        className="search-input"
        placeholder="Search for a country..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
