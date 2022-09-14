import { appState } from "../AppState.js";
import { Home } from "../Models/Home.js";
import { saveState } from "../Utils/Store.js";
import { SandboxServer } from "./AxiosService.js";

class HomesService {
  setActiveHome(id) {
    const home = appState.homes.find((h) => h.id == id);
    if (!home) {
      throw new Error("bad id");
    }
    appState.activeHome = home;
    console.log(appState.activeHome);
  }
  async editHome(formData) {
    const home = appState.activeHome;
    const res = await SandboxServer.put(`/api/houses/${home.id}`, formData);
    console.log("update response", res.data);
    const updatedHome = new Home(res.data);

    const index = appState.homes.findIndex((h) => h.id == home.id);
    appState.homes.splice(index, 1, updatedHome);
    appState.emit("homes");
  }
  async deleteHome(id) {
    await SandboxServer.delete(`/api/houses/${id}`);
    appState.homes = appState.homes.filter((h) => h.id != id);
  }
  async addHome(formData) {
    const res = await SandboxServer.post("/api/houses", formData);
    let home = new Home(res.data);
    appState.homes = [...appState.homes, home];
  }
  async getHomes() {
    const res = await SandboxServer.get("/api/houses");
    appState.homes = res.data.map((home) => new Home(home));
  }
}
export const homesService = new HomesService();
