import { uuid } from 'uuidv4';
import fs from "fs"
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(
    name: string,
    id?: string
  ) {
    this.name = name;
    this.id = id || uuid()
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  pathToDb = path.join(__dirname, "../../db/searchHistory.json")
  // TODO: Define a read method that reads from the searchHistory.json file
  async read() {
    const cities = fs.readFileSync(this.pathToDb, "utf-8")
    const parseCities = JSON.parse(cities).map((city: any) => new City(city.name, city.id))
    console.log(parseCities);
    return parseCities
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // Read from the database
    const cities = await this.read()
    //Check if the new city already exist
    const cityNames = cities.map((element: any) => element.name)
    if (cityNames.includes(city)) return
    //Push the new city to the cities array
    cities.push(new City(city))
    //Write to the file
    fs.writeFileSync(this.pathToDb, JSON.stringify(cities))
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
