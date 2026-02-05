import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  RefreshCw,
  MapPin,
  Wheat,
  Shield,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------- Interfaces ----------------------
interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  visibility: number;
  name: string;
  country?: string;
}

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: { main: string; description: string; icon: string }[];
    dt_txt: string;
    rain?: { "3h": number };
  }[];
}

interface AdvisoryWeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  rainfall: number;
  condition: string;
  icon: string;
  uv: number;
}

interface WeatherRecommendation {
  type: 'warning' | 'success' | 'info';
  icon: JSX.Element;
  title: string;
  message: string;
  crops: string[];
}

// ---------------------- Agriculture Advisory ----------------------
const AgricultureAdvisory = ({ weatherData }: { weatherData: AdvisoryWeatherData }) => {
  const getCropRecommendations = () => {
    const { temperature, humidity, rainfall, condition } = weatherData;
    const recommendations: WeatherRecommendation[] = [];

    if (temperature > 35) {
      recommendations.push({
        type: "warning",
        icon: <Thermometer className="w-4 h-4" />,
        title: "High Temperature Alert",
        message:
          "Ensure adequate irrigation. Consider shade nets for sensitive crops. Harvest early morning or evening.",
        crops: ["Tomatoes", "Leafy Greens", "Peppers"],
      });
    } else if (temperature < 10) {
      recommendations.push({
        type: "warning",
        icon: <Shield className="w-4 h-4" />,
        title: "Cold Weather Protection",
        message:
          "Protect crops from frost. Use row covers or greenhouse protection for sensitive plants.",
        crops: ["Citrus", "Tropical Fruits", "Tender Vegetables"],
      });
    } else {
      recommendations.push({
        type: "success",
        icon: <CheckCircle className="w-4 h-4" />,
        title: "Optimal Temperature",
        message:
          "Good conditions for most crop activities including planting and harvesting.",
        crops: ["Wheat", "Rice", "Corn", "Vegetables"],
      });
    }

    if (humidity > 80) {
      recommendations.push({
        type: "warning",
        icon: <Droplets className="w-4 h-4" />,
        title: "High Humidity Warning",
        message:
          "Increased risk of fungal diseases. Ensure good air circulation and consider fungicide application.",
        crops: ["All crops - Disease monitoring required"],
      });
    } else if (humidity < 30) {
      recommendations.push({
        type: "info",
        icon: <Sun className="w-4 h-4" />,
        title: "Low Humidity",
        message:
          "Increase irrigation frequency. Consider misting for greenhouse crops.",
        crops: ["Leafy Greens", "Herbs", "Greenhouse Crops"],
      });
    }

    if (rainfall > 10) {
      recommendations.push({
        type: "info",
        icon: <Droplets className="w-4 h-4" />,
        title: "Heavy Rainfall",
        message:
          "Ensure proper drainage. Delay pesticide applications. Check for waterlogging.",
        crops: ["All crops - Drainage important"],
      });
    } else if (rainfall === 0 && condition.toLowerCase() === "clear") {
      recommendations.push({
        type: "info",
        icon: <Wheat className="w-4 h-4" />,
        title: "Dry Conditions",
        message:
          "Good for harvesting and field preparation. Maintain irrigation schedules.",
        crops: ["Grains", "Fruits ready for harvest"],
      });
    }

    return recommendations;
  };

  const getSeasonalAdvice = () => {
    const month = new Date().getMonth();
    const { temperature } = weatherData;

    if (month >= 2 && month <= 5 && temperature > 25) {
      return {
        season: "Summer Season",
        crops: ["Cotton", "Sugarcane", "Rice", "Vegetables", "Fodder crops"],
        activities: ["Irrigation management", "Pest monitoring", "Mulching"],
      };
    } else if (month >= 9 && month <= 11) {
      return {
        season: "Winter Season",
        crops: ["Wheat", "Barley", "Mustard", "Gram", "Peas"],
        activities: ["Sowing", "Land preparation", "Fertilizer application"],
      };
    }

    return {
      season: "Current Season",
      crops: ["Mixed cultivation based on local conditions"],
      activities: ["Regular monitoring", "Irrigation as needed", "Pest control"],
    };
  };

  const recommendations = getCropRecommendations();
  const seasonalAdvice = getSeasonalAdvice();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-primary" />
            <span>Agricultural Advisory</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <Alert
              key={index}
              className={`${
                rec.type === "warning"
                  ? "border-yellow-400 bg-yellow-50"
                  : rec.type === "success"
                  ? "border-green-400 bg-green-50"
                  : "border-blue-400 bg-blue-50"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div>{rec.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <AlertDescription>{rec.message}</AlertDescription>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {rec.crops.map((crop: string, cropIndex: number) => (
                      <Badge key={cropIndex} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seasonal Crop Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold text-lg mb-2">{seasonalAdvice.season}</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {seasonalAdvice.crops.map((crop, index) => (
              <Badge key={index} className="bg-green-100 text-green-800">
                {crop}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {seasonalAdvice.activities.map((activity, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg text-sm font-medium"
              >
                {activity}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ---------------------- Weather Dashboard ----------------------
const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "15a089805b00267c8ec096f2affffe39";

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "clouds":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "snow":
        return <CloudSnow className="h-8 w-8 text-blue-300" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!currentResponse.ok) throw new Error("Failed to fetch weather data");
      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) throw new Error("Failed to fetch forecast data");
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Location denied. Using Delhi as default.");
          fetchWeatherData(28.6139, 77.209);
        }
      );
    } else {
      setError("Geolocation not supported. Using Delhi as default.");
      fetchWeatherData(28.6139, 77.209);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getDailyForecast = () => {
    if (!forecast) return [];
    const daily: { [key: string]: typeof forecast.list[0] } = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!daily[date]) daily[date] = item;
    });
    return Object.values(daily).slice(0, 7);
  };

  const chartData =
    getDailyForecast().map((day) => ({
      day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      maxTemp: Math.round(day.main.temp_max),
      minTemp: Math.round(day.main.temp_min),
      rainfall: day.rain?.["3h"] || 0,
    })) || [];

  return (
    <section id="weather" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 bg-green-600 rounded-2xl p-8 shadow-lg">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Weather Intelligence
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Real-time weather monitoring with agricultural insights
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
            <p className="text-yellow-700">{error}</p>
          </div>
        )}

        {/* Current Weather */}
        {currentWeather && (
          <div className="mb-12">
            <Card className="bg-green-600 text-white rounded-2xl p-8 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-white" />
                  <CardTitle className="text-2xl">{currentWeather.name}</CardTitle>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  {getWeatherIcon(currentWeather.weather[0].main)}
                  <span className="text-5xl font-bold">
                    {Math.round(currentWeather.main.temp)}°C
                  </span>
                </div>
                <CardDescription className="text-white/80 text-lg capitalize">
                  {currentWeather.weather[0].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-white/80 text-sm">Feels like</p>
                    <p className="text-xl font-semibold">
                      {Math.round(currentWeather.main.feels_like)}°C
                    </p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-white/80 text-sm">Humidity</p>
                    <p className="text-xl font-semibold">
                      {currentWeather.main.humidity}%
                    </p>
                  </div>
                  <div className="text-center">
                    <Wind className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-white/80 text-sm">Wind</p>
                    <p className="text-xl font-semibold">
                      {currentWeather.wind.speed} m/s
                    </p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-white/80 text-sm">Visibility</p>
                    <p className="text-xl font-semibold">
                      {(currentWeather.visibility / 1000).toFixed(1)} km
                    </p>
                  </div>
                  <div className="text-center">
                    <CloudRain className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-white/80 text-sm">Rainfall</p>
                    <p className="text-xl font-semibold">
                      {forecast?.list[0]?.rain?.["3h"] || 0} mm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agricultural Advisory */}
        {currentWeather && (
          <div className="mb-12">
            <AgricultureAdvisory
              weatherData={{
                location: currentWeather.name,
                temperature: currentWeather.main.temp,
                humidity: currentWeather.main.humidity,
                windSpeed: currentWeather.wind.speed,
                visibility: currentWeather.visibility / 1000,
                rainfall: forecast?.list[0]?.rain?.["3h"] || 0,
                condition: currentWeather.weather[0].main,
                icon: currentWeather.weather[0].icon,
                uv: 5,
              }}
            />
          </div>
        )}

        {/* Forecast + Chart */}
        {forecast && (
          <div className="space-y-8">
            {/* Forecast Cards */}
            <Card>
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {getDailyForecast().map((day) => {
                    const date = new Date(day.dt * 1000);
                    return (
                      <Card
                        key={day.dt}
                        className="text-center bg-gradient-to-b from-card to-muted/30"
                      >
                        <CardContent className="p-4">
                          <p className="font-medium text-sm mb-2">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </p>
                          <div className="flex justify-center mb-2">
                            {getWeatherIcon(day.weather[0].main)}
                          </div>
                          <p className="text-lg font-bold">
                            {Math.round(day.main.temp_max)}°
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {Math.round(day.main.temp_min)}°
                          </p>
                          <p className="text-xs capitalize mt-2">
                            {day.weather[0].description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Rainfall Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="temp" orientation="left" />
                      <YAxis yAxisId="rain" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="maxTemp"
                        stroke="red"
                        strokeWidth={3}
                        dot
                        name="Max Temp (°C)"
                      />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="minTemp"
                        stroke="blue"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot
                        name="Min Temp (°C)"
                      />
                      <Line
                        yAxisId="rain"
                        type="monotone"
                        dataKey="rainfall"
                        stroke="green"
                        strokeWidth={2}
                        dot
                        name="Rainfall (mm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <Button
            onClick={getUserLocation}
            disabled={loading}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            {loading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Weather Data
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WeatherDashboard;
