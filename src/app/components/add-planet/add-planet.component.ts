import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PlanetsService } from 'src/app/service/planets.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-planet',
  templateUrl: './add-planet.component.html',
  styleUrls: ['./add-planet.component.css']
})

export class AddPlanetComponent {

  @ViewChild('localForm') form: NgForm | undefined;

  constructor(private readonly planetsService: PlanetsService) { }

  planetForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)], this.nameAsyncValidator.bind(this)),
    size: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{0,3}.?[0-9]{0,4}$")]),
    distance: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{0,2}.?[0-9]{0,3}$")]),
    ordinality: new FormControl('', [Validators.required, Validators.pattern("[1-8]")]),
    description: new FormControl('', [Validators.required, Validators.maxLength(400)]),
  }, { updateOn: 'blur' });

  // name has to be unique - asyncValidator
  // using FormControl as type causes an error - not generic enough?
  // this function doesn't have to be async   
  nameAsyncValidator(control: any): Promise<any> {

    const response = new Promise((resolve, _reject) => {

      // don't know if having async callback inside of setTimeout is bad or not
      // I tried subscribing to the planetsService.fetchPlanet call but I wasn't getting a Planet object back

      setTimeout(async () => {
        const value = await firstValueFrom(this.planetsService.fetchPlanet(control.value));

        if (value !== null) {
          resolve({ duplicate: true });
        } else {
          resolve(null);
        }

      }, 3000)
    })
    return response;
  }

  reset() {
    this.form?.resetForm();
  }

  onSubmit() {
    if (this.planetForm.valid) {
      this.planetsService.addPlanet(this.planetForm.value).subscribe(data => console.log(data));
      this.reset();
      // if you redirect here, the new value will not be added to the homepage in time
      // need to add async / await and change implementation to have work as intended - loading state might help?
    }

  }
}
