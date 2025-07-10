import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import {
  WbSunny,
  Cloud,
  Thunderstorm,
  AcUnit,
  Grain,
  Visibility,
} from "@mui/icons-material";
import { getTemperatureColor } from "./api";

/**
 * WeatherCard component displays weather information in a styled Material UI card
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data object containing temperature, condition, etc.
 * @returns {JSX.Element} Rendered weather card component
 */
const WeatherCard = ({ weatherData }) => {
  // Get the appropriate icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WbSunny sx={{ fontSize: 48, color: "#FFD700" }} />;
      case "partly cloudy":
      case "cloudy":
        return <Cloud sx={{ fontSize: 48, color: "#87CEEB" }} />;
      case "rainy":
      case "showers":
        return <Grain sx={{ fontSize: 48, color: "#4169E1" }} />;
      case "snowy":
        return <AcUnit sx={{ fontSize: 48, color: "#E0E0E0" }} />;
      case "thunderstorm":
        return <Thunderstorm sx={{ fontSize: 48, color: "#483D8B" }} />;
      case "foggy":
        return <Visibility sx={{ fontSize: 48, color: "#A9A9A9" }} />;
      default:
        return <Cloud sx={{ fontSize: 48, color: "#87CEEB" }} />;
    }
  };

  // Get background color based on temperature
  const backgroundColor = getTemperatureColor(weatherData.temperature);

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 400,
        margin: "20px auto",
        background: `linear-gradient(135deg, ${backgroundColor}22, ${backgroundColor}11)`,
        border: `2px solid ${backgroundColor}`,
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", padding: 3 }}>
        {/* City Name */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: backgroundColor,
            marginBottom: 2,
          }}
        >
          {weatherData.cityName}
        </Typography>

        {/* Weather Icon */}
        <Box sx={{ marginBottom: 2 }}>
          {getWeatherIcon(weatherData.condition)}
        </Box>

        {/* Temperature */}
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontWeight: "bold",
            color: backgroundColor,
            marginBottom: 1,
          }}
        >
          {weatherData.temperature}°C
        </Typography>

        {/* Weather Condition */}
        <Chip
          label={weatherData.condition}
          sx={{
            backgroundColor: backgroundColor,
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: 2,
            padding: "8px 16px",
            height: "auto",
          }}
        />

        {/* Additional Weather Info */}
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            Wind Speed: {weatherData.windSpeed} km/h
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            Last updated: {weatherData.lastUpdated}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// PropTypes validation for weatherData prop
WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    windSpeed: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherCard;
