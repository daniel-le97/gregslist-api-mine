import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { carsService } from "../Services/CarsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function drawCars() {
  let template = "";
  appState.cars.forEach((car) => (template += car.CarCardTemplate));
  // TODO trigger bad set
  setHTML("listings", template);
}

export class CarsController {
  constructor() {
    appState.on("cars", drawCars);
    this.showCars();
  }

  async getCars() {
    try {
      await carsService.getCars();
    } catch (error) {
      console.error("[GetCars]", error);
      Pop.error(error);
    }
  }

  showCars() {
    this.getCars();
    setHTML("forms", Car.getCarForm());
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault();
      // @ts-ignore
      const form = window.event.target;
      let formData = getFormData(form);

      // HOW DO I KNOW IF I AM EDITING OR CREATING?
      if (appState.activeCar) {
        await carsService.editCar(formData);
      } else {
        await carsService.addCar(formData);
        // @ts-ignore
        form.reset();
      }
    } catch (error) {
      console.error("[AddCar]", error);
      Pop.error(error);
    }
  }

  async deleteCar(id) {
    try {
      await carsService.deleteCar(id);
    } catch (error) {
      console.error("[DeletingCar]", error);
      Pop.error(error);
    }
  }

  addCar() {
    // @ts-ignore
    appState.activeCar = null;
    const template = Car.getCarForm();
    setHTML("forms", template);
  }

  beginEdit(id) {
    // TWO JOBS find the car by its id
    // and then what???
    // Then fill in the form with all the values
    carsService.setActiveCar(id);
    const editable = appState.activeCar;
    const template = Car.getCarForm(editable);

    setHTML("forms", template);
  }
}
