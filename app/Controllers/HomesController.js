import { appState } from "../AppState.js";
import { Home } from "../Models/Home.js";
import { homesService } from "../Services/homesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHomes() {
  let template = "";
  appState.homes.forEach((home) => (template += home.HomeListingTemplate));
  setHTML("listings", template);
}

export class HomesController {
  constructor() {
    appState.on("homes", _drawHomes);
  }

  async handleSubmit() {
    try {
      window.event.preventDefault();
      const form = window.event.target;
      let formData = getFormData(form);

      if (appState.activeHome) {
        await homesService.editHome(formData);
      } else {
        await homesService.addHome(formData);
        // @ts-ignore
        form.reset();
      }
    } catch (error) {
      console.error("[addJob]", error);
      Pop.error(error);
    }
  }

  beginEditHome(id) {
    homesService.setActiveHome(id);
    const editable = appState.activeHome;
    const template = Home.getHomesForm(editable);
    setHTML("forms", template);
  }

  async deleteHome(id) {
    try {
      const yes = await Pop.confirm("delete this house listing?");
      if (!yes) {
        return;
      }
      await homesService.deleteHome(id);
    } catch (error) {
      console.error("[deleteJob]", error);
    }
  }

  addHome() {
    appState.activeHome = null;
    const template = Home.getHomesForm();
    setHTML("forms", template);
  }
  showHomes() {
    this.getHomes();
    setHTML("forms", Home.getHomesForm());
  }
  async getHomes() {
    try {
      await homesService.getHomes();
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }
}
