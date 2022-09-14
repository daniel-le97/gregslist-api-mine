export class Car {
  /**
   * The data needed to make a car
   * @param {{make: string, model: string, year: number, price: number, description: string, imgUrl: string, id?:string}} data 
   */
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.imgUrl = data.imgUrl || 'https://www.autolist.com/assets/listings/default_car.jpg'
  }

  get CarCardTemplate() {
    return /*html*/`
    <div class="col-md-4 col-lg-3 mb-3"> 
      <div class="card">
        <img src="${this.imgUrl}" alt="${this.make}-${this.model}" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
            ${this.make} | ${this.model} ${this.year}
          </h5>
          <p>
            <strong>$ ${this.price}</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.carsController.deleteCar('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.carsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
    `
  }


  // TODO using an editable...
  /**@param {Car} [editable] */
  static getCarForm(editable) {


    editable = editable || new Car({ description: '', imgUrl: ' ', make: '', model: '', price: 0, year: 1990 })

    return /*html*/`
      <form onsubmit="app.carsController.handleSubmit()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="make" required minlength="3" maxlength="20" value="${editable.make}">
          <label for="make">Make</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="model" required value="${editable.model}">
          <label for="model">Model</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="1886" max="9999" value="${editable.year}">
          <label for="year">Year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="price" required min="0" value="${editable.price}">
          <label for="price">Price</label>
        </div>

        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="imgUrl" value="${editable.imgUrl}">
          <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description">${editable.description}</textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>
      `
  }




}