import './style.css';
import DomElements from './domElements';

const dom = new DomElements();

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=8N42KG4NYQDW4YHNNDAG7F2QG&contentType=json`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function farenheitData(weatherData) {
  const processed = {
    location: weatherData.resolvedAddress,
    description: weatherData.description,
    currentTemp: String(weatherData.days[0].temp.toFixed(1)) + '°F',
    feelsLikeTemp: String(weatherData.days[0].feelslike.toFixed(1)) + '°F',
  };
  console.log(processed);
}

function celsiusData(weatherData) {
  const processed = {
    location: weatherData.resolvedAddress,
    description: weatherData.description,
    currentTemp: ((weatherData.days[0].temp - 32) * (5 / 9)).toFixed(1) + '°C',
    feelsLikeTemp:
      ((weatherData.days[0].feelslike - 32) * (5 / 9)).toFixed(1) + '°C',
  };
  console.log(processed);
}

dom.swapTempButton.addEventListener('click', () => {
  if (dom.swapTempButton.textContent === 'Celsius') {
    dom.swapTempButton.textContent = 'Fahrenheit';
    getWeatherData('Toronto').then((data) => {
      farenheitData(data);
    });
  } else {
    dom.swapTempButton.textContent = 'Celsius';
    getWeatherData('Toronto').then((data) => {
      celsiusData(data);
    });
  }
});
