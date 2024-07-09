export const fetchWeather = async () => {
  const apiUrl = "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/weather`);
  return response.json();
};
