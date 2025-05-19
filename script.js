const main = document.querySelector(".countries");
const search = document.querySelector(".search");
const toggle_button  = document.querySelector(".toggle-button");

search.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const country = document.createElement("div");
    country.className = "country-card";
    main.appendChild(country);

    const countryInfo = document.createElement("div");
    countryInfo.className = "country-info";
    country.appendChild(countryInfo);

    const countryName = document.createElement("h2");

    const info = await getCountryInfo(search.value);
    search.value = "";

    if (info.status === 404) {
      countryInfo.innerHTML = `<p>Country not found</p>`;
      return;
    }

    const flag = document.createElement("img");
    flag.src = `${info.flag}`;

    const population = document.createElement("p");
    population.innerHTML = `<strong>Population:</strong> ${putComma(info.population)}`;

    const region = document.createElement("p");
    region.innerHTML = `<strong>Region:</strong> ${info.region}`;

    const capital = document.createElement("p");
    capital.innerHTML = `<strong>Capital:</strong> ${info.capital}`;
    
    countryName.textContent = `${info.name}`;
    countryInfo.appendChild(flag);
    countryInfo.appendChild(countryName);
    countryInfo.appendChild(population);
    countryInfo.appendChild(region);
    countryInfo.appendChild(capital);
  }
});

async function getCountryInfo(country) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true&fields=population,region,capital,flags,name`);
    if (!response.ok) {
        return { status: response.status };
    }
    const data = await response.json();
    console.log(data);
    return { population: data[0].population, region: data[0].region, capital: data[0].capital[0], flag: data[0].flags.png, name: data[0].name.common };
}

toggle_button.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggle_button.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

function putComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}