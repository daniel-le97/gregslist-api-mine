export class Home {
  constructor(data) {
    this.id = data._id;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.levels = data.levels;
    this.imgUrl = data.imgUrl;
    this.description = data.description;
    this.price = data.price;
    this.year = data.year;
  }

  get HomeListingTemplate() {
    return /*html*/ `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img src="${this.imgUrl}" alt="${this.bedrooms}-${this.bathrooms}" class="img-fluid">
        <p>Floors: ${this.levels} | year: ${this.year}</p>
        <div class="card-body">
          <h5 class="text-uppercase">
          Bedrooms: ${this.bedrooms} | Bathrooms: ${this.bathrooms}
          </h5>
          <p>
            <strong>$ ${this.price}</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-primary" onclick="app.homesController.deleteHome('${this.id}')">delete</button>
        <button class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.homesController.beginEditHome('${this.id}')">edit</button>
        </div>
      </div>
    </div>
    `;
  }

  /**@param {Home} [editable] */
  static getHomesForm(editable) {
    editable =
      editable ||
      new Home({
        description: "",
        year: "",
        price: "",
        imgUrl: "",
        levels: "",
        bedrooms: "",
        bathrooms: "",
      });

    return /*html*/ `

    <form onsubmit="app.homesController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="price" required minlength="3" maxlength="20" value="${
            editable.price
          }">
          <label for="price">price</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required value="${
            editable.year
          }">
          <label for="year">year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bedrooms" required min="0" max="9999" value="${
            editable.bedrooms
          }">
          <label for="bedrooms">bedrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="bathrooms" required min="0" value="${
            editable.bathrooms
          }">
          <label for="bathrooms">bathrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="levels" required min="0" value="${
            editable.levels
          }">
          <label for="levels">levels</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="imgUrl" required  value="${
            editable.imgUrl
          }">
          <label for="imgUrl">imgUrl</label>
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
