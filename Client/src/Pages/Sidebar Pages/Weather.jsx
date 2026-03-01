import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const API_KEY = "dc040c43d64b57be637d96ba77349e6c";

export default function Weather() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState([20.5937, 78.9629]);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      setCoords([res.data.coord.lat, res.data.coord.lon]);
    } catch {
      alert("City not found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">

      {/* Glass Container */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center text-white">

        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
          🌤️ Weather Explorer
        </h1>

        {/* Search Inputs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <input
            type="text"
            placeholder="City"
            className="px-4 py-2 rounded-full text-black focus:outline-none shadow-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Country Code (IN, US...)"
            className="px-4 py-2 rounded-full text-black focus:outline-none shadow-md"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button
            onClick={fetchWeather}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Search
          </button>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className="bg-white/30 rounded-2xl p-6 mb-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>

            <h1 className="text-6xl font-bold my-3">
              {weather.main.temp}°C
            </h1>

            <p className="capitalize text-lg">
              {weather.weather[0].description}
            </p>

            <div className="flex justify-center gap-6 mt-4 text-lg">
              <span>💧 {weather.main.humidity}%</span>
              <span>🌬️ {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
          <MapContainer center={coords} zoom={10} className="h-full w-full">
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={coords}>
              <Popup>{city || "Location"}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}