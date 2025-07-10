/**
 * Weather API utility functions using Open-Meteo API
 * Open-Meteo is a free weather API that doesn't require authentication
 */

// Predefined cities with their coordinates for weather fetching
export const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
];

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&temperature_unit=celsius`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    // Transform the API response into a more user-friendly format
    return {
      temperature: Math.round(data.current_weather.temperature),
      condition: getWeatherCondition(data.current_weather.weathercode),
      windSpeed: data.current_weather.windspeed,
      lastUpdated: new Date().toLocaleTimeString(),
      cityName: city.name,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * Maps weather codes from Open-Meteo API to human-readable conditions
 * @param {number} code - Weather code from API
 * @returns {string} Human-readable weather condition
 */
const getWeatherCondition = (code) => {
  // Open-Meteo weather codes mapping
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Cloudy";
};

/**
 * Determines the background color based on temperature
 * @param {number} temperature - Temperature in Celsius
 * @returns {string} Color for styling
 */
export const getTemperatureColor = (temperature) => {
  if (temperature >= 25) return "#ff5722"; // Hot - Red/Orange
  if (temperature <= 10) return "#2196f3"; // Cold - Blue
  return "#757575"; // Moderate - Grey
};
