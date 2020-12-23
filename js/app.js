const searchInput = document.getElementById('search');
const tboby = document.getElementById('countrysTable');
const globalPopulation = 7827000000;

let searchTerm = '';
let countriesCovid;
let countriesFlag;
const fetchCountriesCovid = async () => {
  countriesCovid = await fetch('https://api.covid19api.com/summary').then((res) => res.json());
};
const fetchCountries = async () => {
  countriesFlag = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag').then((res) => res.json());
};
let flagArr = [];
const countrySelector = document.getElementById('countrySelector');

const showCountries = async () => {
  tboby.innerHTML = '';
  flagArr = [];
  await fetchCountriesCovid();
  await fetchCountries();
  document.getElementById('globalCasesCount').innerHTML = (countriesCovid.Global.TotalConfirmed).toLocaleString();

  const ul = document.createElement('ul');
  ul.classList.add('countries');

  for (let i = 0; i < countriesCovid.Countries.length; i += 1) {
    for (let j = 0; j < countriesFlag.length; j += 1) {
      if (countriesFlag[j].name === countriesCovid.Countries[i].Country) {
        flagArr.push({ ...countriesFlag[j], ...countriesCovid.Countries[i] });
      }
    }
  }
  if (countrySelector.innerHTML === 'Cases' || countrySelector.innerHTML === 'Cases per 100k') {
    flagArr.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed);
  } else if (countrySelector.innerHTML === 'Recovered' || countrySelector.innerHTML === 'Recovered per 100k') {
    flagArr.sort((prev, next) => next.TotalRecovered - prev.TotalRecovered);
  } else if (countrySelector.innerHTML === 'Death' || countrySelector.innerHTML === 'Death per 100k') {
    flagArr.sort((prev, next) => next.TotalDeaths - prev.TotalDeaths);
  } else if (countrySelector.innerHTML === 'Cases day' || countrySelector.innerHTML === 'Cases day per 100k') {
    flagArr.sort((prev, next) => next.NewConfirmed - prev.NewConfirmed);
  } else if (countrySelector.innerHTML === 'Recovered day' || countrySelector.innerHTML === 'Recovered day per 100k') {
    flagArr.sort((prev, next) => next.NewRecovered - prev.NewRecovered);
  } else if (countrySelector.innerHTML === 'Death day' || countrySelector.innerHTML === 'Death day per 100k') {
    flagArr.sort((prev, next) => next.NewDeaths - prev.NewDeaths);
  }

  flagArr
    .filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .forEach((country) => {
      const li = document.createElement('li');
      const countryFlag = document.createElement('img');
      const countryName = document.createElement('span');
      const countryInfo = document.createElement('div');
      const countryCases = document.createElement('h2');

      li.classList.add('country-item');
      countryInfo.classList.add('country-item__info');
      countryFlag.src = country.flag;
      countryFlag.classList.add('flag-img');

      countryName.innerText = country.name;
      countryName.classList.add('country-item__name');

      if (countrySelector.innerHTML === 'Cases') {
        countryCases.innerText = country.TotalConfirmed.toLocaleString();
      } else if (countrySelector.innerHTML === 'Recovered') {
        countryCases.innerText = country.TotalRecovered.toLocaleString();
      } else if (countrySelector.innerHTML === 'Death') {
        countryCases.innerText = country.TotalDeaths.toLocaleString();
      } else if (countrySelector.innerHTML === 'Cases day') {
        countryCases.innerText = country.NewConfirmed.toLocaleString();
      } else if (countrySelector.innerHTML === 'Recovered day') {
        countryCases.innerText = country.NewRecovered.toLocaleString();
      } else if (countrySelector.innerHTML === 'Death day') {
        countryCases.innerText = country.NewDeaths.toLocaleString();
      } else if (countrySelector.innerHTML === 'Cases per 100k') {
        countryCases.innerText = parseFloat(((country.TotalConfirmed * 100000)
        / country.population).toFixed(2)).toLocaleString();
      } else if (countrySelector.innerHTML === 'Recovered per 100k') {
        countryCases.innerText = parseFloat(((country.TotalRecovered * 100000)
        / country.population).toFixed(2)).toLocaleString();
      } else if (countrySelector.innerHTML === 'Death per 100k') {
        countryCases.innerText = parseFloat(((country.TotalDeaths * 100000)
        / country.population).toFixed(2)).toLocaleString();
      } else if (countrySelector.innerHTML === 'Cases day per 100k') {
        countryCases.innerText = parseFloat(((country.NewConfirmed * 100000)
        / country.population).toFixed(2)).toLocaleString();
      } else if (countrySelector.innerHTML === 'Recovered day per 100k') {
        countryCases.innerText = parseFloat(((country.NewRecovered * 100000)
        / country.population).toFixed(2)).toLocaleString();
      } else if (countrySelector.innerHTML === 'Death day per 100k') {
        countryCases.innerText = parseFloat(((country.NewDeaths * 100000)
        / country.population).toFixed(2)).toLocaleString();
      }

      countryCases.classList.add('country-item__population');

      countryInfo.appendChild(countryCases);

      li.appendChild(countryFlag);
      li.appendChild(countryName);
      li.appendChild(countryInfo);
      ul.appendChild(li);
    });
  tboby.appendChild(ul);
};

showCountries();

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  showCountries();
});
let thisCountry;

const showDataByTable = async (event) => {
  let eventShow = event;
  await fetchCountriesCovid();
  const tableSelectorInterval = document.getElementById('tableSelectorInterval');
  const tableSelectorValues = document.getElementById('tableSelectorValues');
  if (eventShow === undefined) {
    eventShow = countriesCovid.Global;
    eventShow.population = 7827000000;
  } else if (eventShow.flag !== undefined) {
    document.getElementById('casesTableWrapperImg').setAttribute('src', eventShow.flag);
    document.getElementById('casesTableWrapperName').innerHTML = eventShow.Country;
  }
  const globalCasesTable = document.getElementById('globalCasesTable');
  const globalRecoveredTable = document.getElementById('globalRecoveredTable');
  const globalDeathTable = document.getElementById('globalDeathTable');
  if (tableSelectorInterval.innerHTML === 'All the time' && tableSelectorValues.innerHTML === 'Total') {
    globalCasesTable.innerHTML = eventShow.TotalConfirmed.toLocaleString();
    globalRecoveredTable.innerHTML = eventShow.TotalRecovered.toLocaleString();
    globalDeathTable.innerHTML = eventShow.TotalDeaths.toLocaleString();
  } else if (tableSelectorInterval.innerHTML === 'All the time' && tableSelectorValues.innerHTML === 'Per 100k') {
    globalCasesTable.innerHTML = parseFloat(((eventShow.TotalConfirmed * 100000)
      / eventShow.population).toFixed(2)).toLocaleString();
    globalRecoveredTable.innerHTML = parseFloat(((eventShow.TotalRecovered * 100000)
      / eventShow.population).toFixed(2)).toLocaleString();
    globalDeathTable.innerHTML = parseFloat(((eventShow.TotalDeaths * 100000)
      / eventShow.population).toFixed(2)).toLocaleString();
  } else if (tableSelectorInterval.innerHTML === 'Day' && tableSelectorValues.innerHTML === 'Total') {
    globalCasesTable.innerHTML = `+ ${eventShow.NewConfirmed.toLocaleString()}`;
    globalRecoveredTable.innerHTML = `+ ${eventShow.NewRecovered.toLocaleString()}`;
    globalDeathTable.innerHTML = `+ ${eventShow.NewDeaths.toLocaleString()}`;
  } else if (tableSelectorInterval.innerHTML === 'Day' && tableSelectorValues.innerHTML === 'Per 100k') {
    globalCasesTable.innerHTML = `+ ${parseFloat(((eventShow.NewConfirmed * 100000)
    / eventShow.population).toFixed(2)).toLocaleString()}`;
    globalRecoveredTable.innerHTML = `+ ${parseFloat(((event.NewRecovered * 100000)
    / eventShow.population).toFixed(2)).toLocaleString()}`;
    globalDeathTable.innerHTML = `+ ${parseFloat(((eventShow.NewDeaths * 100000)
    / eventShow.population).toFixed(2)).toLocaleString()}`;
  }
  thisCountry = eventShow;
};

showDataByTable();
document.getElementById('tableSwitchDay').addEventListener('click', () => {
  const tableSwitchInterval = document.getElementById('tableSelectorInterval');

  if (tableSwitchInterval.innerHTML === 'All the time') {
    tableSwitchInterval.innerHTML = 'Day';
  } else {
    tableSwitchInterval.innerHTML = 'All the time';
  }
  showDataByTable(thisCountry);
});

document.getElementById('tableSwitchValues').addEventListener('click', () => {
  const tableSelectorValues = document.getElementById('tableSelectorValues');

  if (tableSelectorValues.innerHTML === 'Total') {
    tableSelectorValues.innerHTML = 'Per 100k';
  } else {
    tableSelectorValues.innerHTML = 'Total';
  }
  showDataByTable(thisCountry);
});

function drawRegionsMap(country) {
  let cases = [];
  let data = 0;
  fetch('https://api.covid19api.com/summary')
    .then((res) => res.json())
    .then((res) => {
      let totatlMap;
      let status;

      res.Countries.forEach((country) => {
        if (countrySelector.innerHTML === 'Cases') {
          totatlMap = country.TotalConfirmed;
          status = 'Cases';
        } else if (countrySelector.innerHTML === 'Recovered') {
          totatlMap = country.TotalRecovered;
          status = 'Recovered';
        } else if (countrySelector.innerHTML === 'Death') {
          totatlMap = country.TotalDeaths;
          status = 'Death';
        } else if (countrySelector.innerHTML === 'Cases day') {
          totatlMap = country.NewConfirmed;
          status = 'Cases day';
        } else if (countrySelector.innerHTML === 'Recovered day') {
          totatlMap = country.NewRecovered;
          status = 'Recovered day';
        } else if (countrySelector.innerHTML === 'Death day') {
          totatlMap = country.NewDeaths;
          status = 'Death day';
        } else if (countrySelector.innerHTML === 'Cases per 100k') {
          totatlMap = parseFloat(((country.TotalConfirmed * 100000)
              / globalPopulation).toFixed(2));
          status = 'Cases per 100k';
        } else if (countrySelector.innerHTML === 'Recovered per 100k') {
          totatlMap = parseFloat(((country.TotalRecovered * 100000)
              / globalPopulation).toFixed(2));
          status = 'Recovered per 100k';
        } else if (countrySelector.innerHTML === 'Death per 100k') {
          totatlMap = parseFloat(((country.TotalDeaths * 100000)
              / globalPopulation).toFixed(2));
          status = 'Death per 100k';
        } else if (countrySelector.innerHTML === 'Cases day per 100k') {
          totatlMap = parseFloat(((country.NewConfirmed * 100000)
              / globalPopulation).toFixed(2));
          status = 'Cases day per 100k';
        } else if (countrySelector.innerHTML === 'Recovered day per 100k') {
          totatlMap = parseFloat(((country.NewRecovered * 100000)
              / globalPopulation).toFixed(2));
          status = 'Recovered day per 100k';
        } else if (countrySelector.innerHTML === 'Death day per 100k') {
          totatlMap = parseFloat(((country.NewDeaths * 100000)
              / globalPopulation).toFixed(2));
          status = 'Death day per 100k';
        }
        cases.push([country.CountryCode, totatlMap]);
      });
      if (country !== undefined) {
        cases = [`${country.CountryCode}`, country.TotalConfirmed];
        data = google.visualization.arrayToDataTable([
          ['Country', `${status}`],
          cases,
        ]);
      } else {
        data = google.visualization.arrayToDataTable([
          ['Country', `${status}`],
          ...cases,
        ]);
      }
      const options = {
        showTooltip: true,
        showInfoWindow: true,
        backgroundColor: '#444666',
        colorAxis: { colors: ['orange', 'red'] },

      };
      const chartMap = new google.visualization.GeoChart(
        document.getElementById('mapWrapperTogle'),
      );
      chartMap.draw(data, options);
    });
}

google.charts.load('current', {
  packages: ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function changeDataState(event) {
  const buttonClick = event.target.closest('button');

  const mapSelector = document.getElementById('mapSelector');

  if (buttonClick.id === 'rightcountrySwitch' || buttonClick.id === 'rightMapSwitch') {
    if (countrySelector.innerHTML === 'Cases') {
      countrySelector.innerHTML = 'Recovered';
      mapSelector.innerHTML = 'Recovered';
    } else if (countrySelector.innerHTML === 'Recovered') {
      countrySelector.innerHTML = 'Death';
      mapSelector.innerHTML = 'Death';
    } else if (countrySelector.innerHTML === 'Death') {
      countrySelector.innerHTML = 'Cases day';
      mapSelector.innerHTML = 'Cases day';
    } else if (countrySelector.innerHTML === 'Cases day') {
      countrySelector.innerHTML = 'Recovered day';
      mapSelector.innerHTML = 'Recovered day';
    } else if (countrySelector.innerHTML === 'Recovered day') {
      countrySelector.innerHTML = 'Death day';
      mapSelector.innerHTML = 'Death day';
    } else if (countrySelector.innerHTML === 'Death day') {
      countrySelector.innerHTML = 'Cases per 100k';
      mapSelector.innerHTML = 'Cases per 100k';
    } else if (countrySelector.innerHTML === 'Cases per 100k') {
      countrySelector.innerHTML = 'Recovered per 100k';
      mapSelector.innerHTML = 'Recovered per 100k';
    } else if (countrySelector.innerHTML === 'Recovered per 100k') {
      countrySelector.innerHTML = 'Death per 100k';
      mapSelector.innerHTML = 'Death per 100k';
    } else if (countrySelector.innerHTML === 'Death per 100k') {
      countrySelector.innerHTML = 'Cases day per 100k';
      mapSelector.innerHTML = 'Cases day per 100k';
    } else if (countrySelector.innerHTML === 'Cases day per 100k') {
      countrySelector.innerHTML = 'Recovered day per 100k';
      mapSelector.innerHTML = 'Recovered day per 100k';
    } else if (countrySelector.innerHTML === 'Recovered day per 100k') {
      countrySelector.innerHTML = 'Death day per 100k';
      mapSelector.innerHTML = 'Death day per 100k';
    } else {
      countrySelector.innerHTML = 'Cases';
      mapSelector.innerHTML = 'Cases';
    }
    showCountries();
  } else {
    if (countrySelector.innerHTML === 'Cases') {
      countrySelector.innerHTML = 'Death day per 100k';
      mapSelector.innerHTML = 'Death day per 100k';
    } else if (countrySelector.innerHTML === 'Death day per 100k') {
      countrySelector.innerHTML = 'Recovered day per 100k';
      mapSelector.innerHTML = 'Recovered day per 100k';
    } else if (countrySelector.innerHTML === 'Recovered day per 100k') {
      countrySelector.innerHTML = 'Cases day per 100k';
      mapSelector.innerHTML = 'Cases day per 100k';
    } else if (countrySelector.innerHTML === 'Cases day per 100k') {
      countrySelector.innerHTML = 'Death per 100k';
      mapSelector.innerHTML = 'Death per 100k';
    } else if (countrySelector.innerHTML === 'Death per 100k') {
      countrySelector.innerHTML = 'Recovered per 100k';
      mapSelector.innerHTML = 'Recovered per 100k';
    } else if (countrySelector.innerHTML === 'Recovered per 100k') {
      countrySelector.innerHTML = 'Cases per 100k';
      mapSelector.innerHTML = 'Cases per 100k';
    } else if (countrySelector.innerHTML === 'Cases per 100k') {
      countrySelector.innerHTML = 'Death day';
      mapSelector.innerHTML = 'Death day';
    } else if (countrySelector.innerHTML === 'Death day') {
      countrySelector.innerHTML = 'Recovered day';
      mapSelector.innerHTML = 'Recovered day';
    } else if (countrySelector.innerHTML === 'Recovered day') {
      countrySelector.innerHTML = 'Cases day';
      mapSelector.innerHTML = 'Cases day';
    } else if (countrySelector.innerHTML === 'Cases day') {
      countrySelector.innerHTML = 'Death';
      mapSelector.innerHTML = 'Death';
    } else if (countrySelector.innerHTML === 'Death') {
      countrySelector.innerHTML = 'Recovered';
      mapSelector.innerHTML = 'Recovered';
    } else {
      countrySelector.innerHTML = 'Cases';
      mapSelector.innerHTML = 'Cases';
    }
    showCountries();
  }
  drawRegionsMap();
}
document.getElementById('countrySwitch').addEventListener('click', (event) => {
  changeDataState(event);
});
document.getElementById('mapSwitch').addEventListener('click', (event) => {
  changeDataState(event);
});
const countriesTable = document.getElementById('countrysTable');
countriesTable.addEventListener('click', (event) => {
  const countryItem = event.target.closest('li');

  flagArr
    .filter((country) => country.name.toLowerCase().includes(countryItem.querySelector('.country-item__name').innerHTML.toLowerCase()))
    .forEach((country) => {
      showDataByTable(country);
      drawRegionsMap(country);
      createGrafic(country.Country);
    });
});

let draw;
let countryName;
let chart = '';
let counter = 0;

const drawChart = async (country) => {
  const cases = [];
  const recovered = [];
  const deaths = [];
  const date = [];
  if (country !== undefined) {
    countryName = country;
    draw = await fetch(
      `https://api.covid19api.com/total/country/${
        countryName}`,
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.length !== 0) {
          res.forEach((day) => {
            cases.push([day.Confirmed]);
            recovered.push([day.Recovered]);
            deaths.push([day.Deaths]);
            date.push([day.Date.slice(0, 10)]);
          });
          return {
            date, cases, recovered, deaths,
          };
        }
      });
  } else {
    draw = await fetch('https://corona-api.com/timeline ')
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.length !== 0) {
          data.reverse().forEach((day) => {
            cases.push([day.confirmed]);
            recovered.push([day.recovered]);
            deaths.push([day.deaths]);
            date.push([day.date]);
          });
          return {
            date, cases, recovered, deaths,
          };
        }
      });
  }
};
const createGrafic = async (country, parameter) => {
  await drawChart(country, parameter);

  function createGraphiсWrapper() {
    let canvasChart = document.querySelector('.canvas').getContext('2d');
    canvasChart.clearRect(0, 0, canvasChart.width, canvasChart.height);

    const date = [];
    for (let i = 0; i < draw.date.length; i += 1) {
      date.push(draw.date[i][0]);
    }
    const chartConfig = {
      type: 'line',
      data: {
        labels: date,
        datasets: [],
      },

      options: {
        tooltips: {
          callbacks: {
            labelColor() {
              return {
                borderColor: 'rgb(255, 255, 0)',
                backgroundColor: 'rgb(255, 0, 0)',
              };
            },
          },
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#fff',
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 7,
            },
          }],
          xAxes: [{
            display: false,
          }],

        },
      },
    };

    const addUserToChart = (config) => {
      const cs = [];
      const recov = [];
      const death = [];
      for (let i = 0; i < draw.cases.length; i += 1) {
        cs.push(draw.cases[i][0]);
      }
      for (let i = 0; i < draw.recovered.length; i += 1) {
        recov.push(draw.recovered[i][0]);
      }
      for (let i = 0; i < draw.deaths.length; i += 1) {
        death.push(draw.deaths[i][0]);
      }

      const dataCases = {
        label: 'Cases',
        data: cs,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      };
      const dataRecovered = {
        label: 'Recovered',
        data: recov,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
      };
      const dataDeaths = {
        label: 'Deaths',
        data: death,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      };
      config.data.datasets.push(dataCases);
      config.data.datasets.push(dataRecovered);
      config.data.datasets.push(dataDeaths);
      chart.update();
    };
    if (counter === 0) {
      chart = new Chart(canvasChart, chartConfig);
      counter += 1;
    } else {
      document.querySelector('.canvas').remove();
      document.querySelector('.chartjs-size-monitor').remove();
      const canvas = document.createElement('canvas');
      canvas.classList.add('canvas');
      document.getElementById('graphiсWrapper').appendChild(canvas);
      canvasChart = document.querySelector('.canvas').getContext('2d');

      chart = new Chart(canvasChart, chartConfig);
    }
    chart.canvas.parentNode.style.height = '40vh';
    chart.canvas.parentNode.style.width = '60vh';
    chart.canvas.style.height = '100%';
    chart.canvas.style.width = '100%';
    addUserToChart(chartConfig);
  }
  createGraphiсWrapper();
};
createGrafic();
