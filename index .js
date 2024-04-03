/ Atribute HTML
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
let weatherContainer;

// Funcții
function validateCity(city) {
  // Verifică dacă orașul este format din cel puțin 3 caractere.
  if (city.length < 3) {
    return false;
  }

  // Verifică dacă orașul nu conține caractere invalide.
  for (const character of city) {
    if (!/[a-zA-Z0-9 ]/.test(character)) {
      return false;
    }
  }

  return true;
}

async function fetchWeather(city) {
  // Declarații variabile
  const apiKey = '2f5d83a36a21a13b493b828d2d718467';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Încearcă să obțină informații despre vreme
  try {
    // Obține răspunsul API
    const response = await fetch(apiUrl);

    // Verifică dacă răspunsul API este OK
    if (!response.ok) {
      // Aruncă o eroare
      throw new Error(response.statusText);
    }

    // Obține informațiile despre vreme din răspunsul API
    const data = await response.json();

    // Afișează informațiile despre vreme
    renderWeather(data);
  } catch (error) {
    // Afișează un mesaj de eroare
    weatherContainer.innerHTML = `
      <p class="error">
        Eroare: ${error.response.status} ${error.response.statusText}
      </p>
    `;
  }
}

function renderWeather(data) {
  // Declarații variabile
  const weatherHtml = `
    <h2>${data.name}</h2>
    <p>Temperatură: ${data.main.temp}°C</p>
    <p>Condiții: ${data.weather[0].description}</p>
  `;

  // Actualizează conținutul elementului `<weather-container>`
  weatherContainer.innerHTML = weatherHtml;
}

// Inițializează variabile
weatherContainer = document.getElementById('weather-container');

// Ascultă clicul pe butonul "Căutare"
searchBtn.addEventListener('click', () => {
  // Verifică dacă orașul este valid
  if (!validateCity(cityInput.value)) {
    return;
  }

  // Obține informații despre vreme pentru orașul specificat
  fetchWeather(cityInput.value);
});