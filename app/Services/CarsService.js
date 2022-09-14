import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";

class CarsService {

  // REVIEW example of a PUT REQUEST aka (UPDATE or EDIT)
  async editCar(formData) {
    const car = appState.activeCar
    const res = await SandboxServer.put(`/api/cars/${car.id}`, formData)
    console.log('the update response', res.data);
    const updatedCar = new Car(res.data)

    // Find the old car in the array and remove it
    // then replace the old car with the new car
    // in the same location
    // before you you replace the new car be sure 
    // to register it as a view model Car

    const index = appState.cars.findIndex(c => c.id == car.id)
    appState.cars.splice(index, 1, updatedCar)
    appState.emit('cars')

    // this.getCars() // DONT its the lazyboy recliner approach also data limit problems exist here

  }

  setActiveCar(id) {
    const car = appState.cars.find(c => c.id == id)
    if (!car) {
      throw new Error('That is a bad Id')
    }
    appState.activeCar = car
    console.log('the active car', appState.activeCar)

  }
  async deleteCar(id) {

    const yes = await Pop.confirm('Delete the Car?')
    if (!yes) { return } // FULL STOP

    // TODO simulate an error 
    await SandboxServer.delete(`/api/cars/${id}`)
    appState.cars = appState.cars.filter(c => c.id != id)
  }

  async getCars() {
    const res = await SandboxServer.get('/api/cars')
    appState.cars = res.data.map(banana => new Car(banana))
  }

  // REVIEW example of a POST REQUEST aka (CREATE)
  async addCar(formData) {
    const res = await SandboxServer.post('/api/cars', formData)
    console.log('what they heck is the create car response?', res.data);
    // res.data includes all of the formData + the brand new shiny ID
    let car = new Car(res.data)
    appState.cars = [...appState.cars, car]
  }
}

// REVIEW SINGLETON PATTERN for services
export const carsService = new CarsService()