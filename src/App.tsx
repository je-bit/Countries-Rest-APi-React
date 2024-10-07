import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Header from "@/components/Header/Header";
import SearchInput from "@/components/SearchBar/SearchInput";
import Filter from "@/components/Filter/Filter";
import Card from "@/components/CardsCountries/CardsCountries";
import CountryInfo from "./pageCountryInfo/CountryInfo";

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<string>("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((country: any) => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital ? country.capital[0] : "N/A",
          flag: country.flags.png,
        }));
        setCountries(formattedData);
      });
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRegion === "" || country.region === filterRegion)
  );

  const HomePage = () => (
    <div>
      <div className="controls">
        <SearchInput onSearch={setSearchTerm} />
        <Filter onFilter={setFilterRegion} />
      </div>
      <div className="card-grid">
        {filteredCountries.map((country) => (
          <Card key={country.name} country={country} />
        ))}
      </div>
    </div>
  );

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <HomePage />
        </>
      ),
    },
    {
      path: "country/:countryName",
      element: (
        <>
          <Header />
          <CountryInfo />
        </>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
