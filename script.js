function getWeather() {
    const apiKey = '5a05143e6eb1e985b4916097f450e24f';
    const city = document.getElementById('city').value; // Memperbaiki dari 'ariaValueMax' ke 'value'
  
    if (!city) {
      alert('Masukan nama kota!');
      return;
    }
  
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; // Memperbaiki URL untuk forecast ke endpoint yang benar
  
    fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        console.error('Error fetching current weather data', error);
        alert('Error fetching current weather data. Please try again');
      });
  
    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        displayHourlyForecast(data.list);
      })
      .catch((error) => {
        console.error('Error fetching hourly forecast data', error);
        alert('Error fetching hourly forecast data. Please try again');
      });
  }
  
  function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('Weather-info'); // Memperbaiki ID ke 'Weather-info'
    const weatherIcon = document.getElementById('Weather-icon'); // Memperbaiki ID ke 'Weather-icon'
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
  
    // Menghapus konten sebelumnya
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
  
    if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Mengonversi dari Kelvin ke Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; // Memperbaiki variabel 'iconUrl'
  
      const temperatureHTML = `<p>${temperature}°C</p>`;
      const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;
  
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHTML;
      weatherIcon.src = iconUrl; // Menggunakan 'iconUrl' yang benar
      weatherIcon.alt = description;
  
      showImage();
    }
  }
  
  function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);
  
    next24Hours.forEach((item) => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Memperbaiki 'Mathround' menjadi 'Math.round'
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Memperbaiki URL ikon cuaca
  
      const hourlyItemHtml = `
          <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
          </div>`;
      hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
  }
  
  function showImage() {
    const weatherIcon = document.getElementById('Weather-icon'); // Memperbaiki ID ke 'Weather-icon'
    weatherIcon.style.display = 'block';
  }
  