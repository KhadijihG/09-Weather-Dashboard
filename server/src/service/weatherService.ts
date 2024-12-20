import dotenv from 'dotenv';
dotenv.config();
import dayjs,{type Dayjs} from 'dayjs'
// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   lat: number;
//   lon: number;
// }

// TODO: Define a class for the Weather object
class Weather {
    city: string;
    date: Dayjs | string;
    icon: string;
    iconDescription: string;
    tempF: number;
    windSpeed: number;
    humidity: number;

    constructor(
        city: string,
        date: Dayjs| string,
        icon: string,
        iconDescription: string,
        tempF: number,
        windSpeed: number,
        humidity: number
    ) {
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
    }

}

// TODO: Complete the WeatherService class
class WeatherService {
    // TODO: Define the baseURL, API key, and city name properties
    baseURL: string;
    APIKey: string;
    cityName: string;

    constructor(
        baseURL: string,
        APIKey: string,
        cityName: string
    ) {
        this.baseURL = process.env.API_BASE_URL || baseURL;
        this.APIKey = process.env.API_KEY || APIKey;
        this.cityName = cityName;
    }
    // TODO: Create fetchLocationData method
    //   private async fetchLocationData(query: string) {
    //     const url = `${this.baseURL}`
    //   }

    // TODO: Create destructureLocationData method
    // private destructureLocationData(locationData: Coordinates): Coordinates {}
    // TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {}
    // TODO: Create buildWeatherQuery method
    // private buildWeatherQuery(coordinates: Coordinates): string {}
    // TODO: Create fetchAndDestructureLocationData method
    // private async fetchAndDestructureLocationData() {}
    // TODO: Create fetchWeatherData method
    // private async fetchWeatherData(coordinates: Coordinates) {}
    // TODO: Build parseCurrentWeather method
    // private parseCurrentWeather(response: any) {}
    // TODO: Complete buildForecastArray method
    // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city: string) {
        const url = `${this.baseURL}/forecast?q=${city}&units=imperial&appid=${this.APIKey}`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        const indexes = [0, 3, 11, 19, 27, 35]
        const forecast = data.list.filter((_element: any, index: number) => indexes.includes(index)).map((element: any) =>{
            //convert timestamp to date
            // const timestamp = element.dt
           return new Weather(
                data.city.name,
                dayjs.unix(element.dt).format('M/D/YYYY'),
                element.weather[0].icon,
                element.weather[0].description,
                element.main.temp,
                element.wind.speed,
                element.main.humidity
            )
        }
        )
        return forecast
    }
}

export default WeatherService;
