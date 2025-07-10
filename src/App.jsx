import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import WeatherCard from "./WeatherCard";
import { cities, fetchWeatherData } from "./api";

// Create a custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
  },
});

function App() {
  // State management using useState hook
  const [selectedCity, setSelectedCity] = useState(""); // Currently selected city
  const [weatherData, setWeatherData] = useState(null); // Fetched weather data
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for failed API calls

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedCity) {
        setWeatherData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const cityObj = cities.find((city) => city.name === selectedCity);

        if (!cityObj) {
          throw new Error("City not found");
        }

        const data = await fetchWeatherData(cityObj);
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError("Failed to fetch weather data. Please try again.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Grid spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Box textAlign="center" marginBottom={2}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  background: "black",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 1,
                }}
              >
                Live Weather Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Get real-time weather updates for cities around the world
              </Typography>
            </Box>
          </Grid>

          {/* City Selection Dropdown */}
          <Grid xs={12} sx={{ marginTop: 5 }}>
            <Box
              width="100%"
              marginBottom={3}
              display="flex"
              justifyContent="center"
            >
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="city-select-label">Select City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={selectedCity}
                  label="Select City"
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12}>
            <Box display="block" width="100%">
              {loading && (
                <Box textAlign="center" padding={4}>
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Loading weather data...
                  </Typography>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ maxWidth: 400 }}>
                  {error}
                </Alert>
              )}

              {weatherData && !loading && !error && (
                <WeatherCard weatherData={weatherData} />
              )}

              {!selectedCity && !loading && !error && (
                <Box textAlign="center" padding={4}>
                  <Typography variant="h6" color="text.secondary">
                    Please select a city to view weather information
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
