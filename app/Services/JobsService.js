import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { Pop } from "../Utils/Pop.js";
import { SandboxServer } from "./AxiosService.js";

class JobsService {
  async editJob(formData) {
    const job = appState.activeJob;
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData);
    console.log("update response", res.data);
    const updatedJob = new Job(res.data);

    const index = appState.jobs.findIndex((j) => j.id == job.id);
    appState.jobs.splice(index, 1, updatedJob);
    appState.emit("jobs");
  }
  setActiveJob(id) {
    const job = appState.jobs.find((j) => j.id == id);
    if (!job) {
      throw new Error("bad id");
    }
    appState.activeJob = job;
    console.log(appState.activeJob);
  }
  async deleteJob(id) {
    await SandboxServer.delete(`/api/jobs/${id}`);
    appState.jobs = appState.jobs.filter((j) => j.id != id);
  }
  async addJob(formData) {
    const res = await SandboxServer.post("/api/jobs", formData);
    console.log("create job response", res.data);
    let job = new Job(res.data);
    appState.jobs = [...appState.jobs, job];
  }

  async getJobs() {
    const res = await SandboxServer.get("/api/jobs");
    appState.jobs = res.data.map((job) => new Job(job));
  }
}
export const jobsService = new JobsService();
