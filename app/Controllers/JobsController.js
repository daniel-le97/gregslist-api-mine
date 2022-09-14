import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { SandboxServer } from "../Services/AxiosService.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawJobs() {
  let template = "";
  appState.jobs.forEach((job) => (template += job.JobListingTemplate));
  setHTML("listings", template);
}

function _drawButton() {
  document
    .getElementById("mainButton")
    .setAttribute("onclick", "app.jobsController.addJob()");

  setText("mainButton", "🏬 Add Jobs");
}

export class JobsController {
  constructor() {
    appState.on("jobs", _drawJobs);
  }

  beginEditJob(id) {
    jobsService.setActiveJob(id);
    const editable = appState.activeJob;
    const template = Job.getJobForm(editable);
    setHTML("forms", template);
    setText("rightBarLabel", "edit");
  }

  async deleteJob(id) {
    try {
      const yes = await Pop.confirm("delete this job listing?");
      if (!yes) {
        return;
      }
      await jobsService.deleteJob(id);
    } catch (error) {
      console.error("[deleteJob]", error);
    }
  }

  async handleSubmit() {
    try {
      window.event.preventDefault();
      const form = window.event.target;
      let formData = getFormData(form);

      if (appState.activeJob) {
        await jobsService.editJob(formData);
      } else {
        await jobsService.addJob(formData);
        // @ts-ignore
        form.reset();
      }
    } catch (error) {
      console.error("[addJob]", error);
      Pop.error(error);
    }
  }

  addJob() {
    appState.activeJob = null;
    const template = Job.getJobForm();
    setHTML("forms", template);
    setText("rightBarLabel", "Add your Job listing!");
  }

  showJobs() {
    this.getJobs();
    setHTML("forms", Job.getJobForm());
    _drawButton();
  }

  async getJobs() {
    try {
      await jobsService.getJobs();
    } catch (error) {
      console.error("[getJobs]", error);
      Pop.error(error);
    }
  }
}
