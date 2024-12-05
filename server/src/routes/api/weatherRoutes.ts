import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async(req, res) => {
  console.log(req.body);
  const weatherService = new WeatherService ('','',req.body.cityName)
 const cityWeather = await weatherService.getWeatherForCity(req.body.cityName)
 res.json(cityWeather)
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
