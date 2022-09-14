import { generateId } from "../Utils/generateId.js";

export class Job {
  /**
   * The data needed to job
  //  * @param {{job: string, company: string, hours: number, salary: number, description: string, imgUrl: string, _id:string}} data
   */
  constructor(data) {
    this.id = data._id;
    this.job = data.jobTitle;
    this.company = data.company;
    this.hours = data.hours;
    this.rate = data.rate;
    this.description = data.description;
  }

  get JobListingTemplate() {
    return /*html*/ `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <h3 class="text-center">${this.job}</h3>
        <div class="card-body">
          <h5 class="text-uppercase">
          ${this.company} | ${this.hours}
          </h5>
          <p>
            <strong>$ ${this.rate} an hour</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-primary" onclick="app.jobsController.deleteJob('${this.id}')">delete</button>
        <button class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEditJob('${this.id}')">edit</button>
        </div>
      </div>
    </div>
    `;
  }

  /**@param {Job} [editable] */
  static getJobForm(editable) {
    editable =
      editable ||
      new Job({
        description: "",
        jobTitle: "",
        rate: "",
        hours: "",
        company: "",
      });

    return /*html*/ `

    <form onsubmit="app.jobsController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="jobTitle" required minlength="3" maxlength="20" value="${
            editable.job
          }">
          <label for="jobTitle">Job</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="company" required value="${
            editable.company
          }">
          <label for="company">Company</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="hours" required min="0" max="9999" value="${
            editable.hours
          }">
          <label for="hours">Hours</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="rate" required min="0" value="${
            editable.rate
          }">
          <label for="rate">rate</label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description">${
            editable.description
          }</textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">
          ${editable.id ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    `;
  }
}
