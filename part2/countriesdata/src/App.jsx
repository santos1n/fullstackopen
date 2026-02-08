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
        {countries.map((e, i) => (
          <Country key={i} country={e} />
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map((e, i) => (
          <CountriesDetail key={i} country={e} />
        ))}
      </div>
    );
  }
};

const CountriesDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <li>Capital {country.capital[0]}</li>
      <li>Area {country.area}</li>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
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
