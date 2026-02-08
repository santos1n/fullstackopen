import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Weather = ({ capital, lat, lon }) => {
  const [temp, setTemp] = useState(null);
  const [urlIcon, setUrlIcon] = useState(null);
  const [wind, setWind] = useState(null);

  useEffect(() => {
    weatherService.getWeather(lat, lon).then((response) => {
      setTemp(response.main.temp);
      setUrlIcon(
        `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`,
      );
      setWind(response.wind.speed);
    });
  }, []);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {(temp - 273.15).toFixed(2)} Celcius</p>
      <img src={urlIcon} width={100} />
      <p>Wind at {wind} m/s</p>
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

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  const showButton = () => setShow(!show);
  const label = show ? "hide" : "show";

  return (
    <div>
      <li>
        {country.name.common} <Button label={label} handleClick={showButton} />
      </li>
      <CountriesDetail country={country} show={show} />
    </div>
  );
};

const CountriesDetail = ({ country, show }) => {
  if (show === false) {
    return null;
  }
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
      <img src={country.flags.png} alt={country.flags.alt} width={200} />
      <Weather
        capital={country.capital}
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
      />
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
    countryService.getCountries().then((response) => {
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
