import { useState, useEffect } from "react";
import countryService from "./services/countries";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  const showButton = () => setShow(!show);

  return (
    <div>
      <li>
        {country.name.common} <Button label="show" handleClick={showButton} />
      </li>
    </div>
  );
};

const CountriesList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((element, index) => (
          <Country key={index} country={element} />
        ))}
      </div>
    );
  }
};

const Button = ({ label, handleClick }) => {
  return <button onClick={handleClick}>{label}</button>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);

  useEffect(() => {
    console.log("effect run, search is now", countries);

    console.log("fetching countries data...");

    countryService.getCountries().then((response) => {
      console.log(response);
      setCountries(response);
    });
  }, []);

  const onSearch = (event) => {
    event.preventDefault();
    setCountriesFilter(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value),
      ),
    );
  };

  return (
    <>
      <div>
        Find Countries <input onChange={onSearch} />{" "}
        <CountriesList countries={countriesFilter} />
      </div>
    </>
  );
};

export default App;
