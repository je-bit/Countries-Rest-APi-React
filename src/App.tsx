import React, { createContext, useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchBar";
import { Filter } from "@/components/Filter";
import { Card } from "@/components/CardsCountries";
import { CountryInfo } from "@/pageCountryInfo/CountryInfo";

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const CountriesContext = createContext<{ countries: Country[] }>({
  countries: [],
});

const useCountries = () => useContext(CountriesContext);

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<string>("");
  const { countries } = useCountries();

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRegion === "" || country.region === filterRegion)
  );

  return (
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
};

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

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

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

  return (
    <CountriesContext.Provider value={{ countries }}>
      <RouterProvider router={routes} />
    </CountriesContext.Provider>
  );
};

export default App;
