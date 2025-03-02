export let GEO_USERNAME = "abdulrahmanhejazi";
export let WEATHER_API_KEY = "bf189e1f58134f449f32622c1f59d6cb";
export let PIXABAY_API_KEY = "48519851-1378a3078ed645c2f51ea0029";

console.log("GeoNames Username:", GEO_USERNAME);
console.log("Weatherbit:", WEATHER_API_KEY);
console.log("Pixabay:", PIXABAY_API_KEY);

export const fetchAPIKeys = async () => {
  try {
    const response = await fetch('http://localhost:5500/getKeys');
    if (!response.ok) throw new Error(`Failed to fetch keys: ${response.status}`);
    const data = await response.json();

    GEO_USERNAME = data.GEO_API_KEY;
    WEATHER_API_KEY = data.WEATHER_API_KEY;
    PIXABAY_API_KEY = data.PIXABAY_API_KEY;

    console.log("Fetched API credentials:", { GEO_USERNAME, WEATHER_API_KEY, PIXABAY_API_KEY });
  } catch (error) {
    console.error('Error fetching API keys:', error);
  }
};

export const handleFormSubmit = async (event) => {
  event.preventDefault();

  const location = document.getElementById("destination").value.trim();
  const departureDate = document.getElementById("departure-date").value;

  if (!location) {
    alert("Please enter a destination!");
    return;
  }

  if (!departureDate) {
    alert("Please select a departure date!");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (departureDate < today) {
    alert("Departure date cannot be in the past!");
    return;
  }

  try {
    const geoResponse = await fetch(
      `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(location)}&maxRows=1&username=${GEO_USERNAME}`
    );
    if (!geoResponse.ok) throw new Error("Failed to fetch location data");
    const geoData = await geoResponse.json();

    if (!geoData.geonames || !geoData.geonames.length) {
      alert("Location not found!");
      return;
    }

    const { lat, lng, name } = geoData.geonames[0];

    console.log("GeoNames Data:", geoData);

    const weatherResponse = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHER_API_KEY}`
    );
    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
    const weatherData = await weatherResponse.json();
    const weatherDescription = weatherData.data[0].weather.description;

    console.log("Weather Data:", weatherData);

    const imageResponse = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(location)}&image_type=photo`
    );
    if (!imageResponse.ok) throw new Error("Failed to fetch image data");
    const imageData = await imageResponse.json();
    const imageUrl = imageData.hits && imageData.hits.length 
                      ? imageData.hits[0].webformatURL 
                      : "default.jpg";

    console.log("Image Data:", imageData);

    const resultsSection = document.getElementById("results");
    resultsSection.style.display = "block";

    document.getElementById("weather-info").textContent = `Weather: ${weatherDescription}`;
    document.getElementById("location-image").innerHTML = `<img src="${imageUrl}" alt="Image of ${name}">`;

    console.log("Results updated successfully!");
    
    clearData();

  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again later.");
  }
};

export function clearData() {
  document.getElementById("destination").value = "";
  document.getElementById("departure-date").value = "";
}
