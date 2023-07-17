import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddPlanetComponent } from './add-planet.component';
import { PlanetsService } from 'src/app/service/planets.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AddPlanetComponent', () => {
  let component: AddPlanetComponent;
  let fixture: ComponentFixture<AddPlanetComponent>;

  let mockPlanetsService = jasmine.createSpyObj(['fetchPlanet', 'addPlanet']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlanetComponent],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: PlanetsService,
        useValue: mockPlanetsService
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#reset', () => {
    const spyformReset = spyOn(component.planetForm, 'reset').and.callThrough();
    component.reset();
    expect(spyformReset).toHaveBeenCalled();
  })

  it('Async Validation testing - Planet Name in DB', fakeAsync(()=> {

    // not much documentation or tutorial examples to test custom validators
    // add to that - the validator uses a timeout - so you have worry about async issues as well
    // this video https://www.youtube.com/watch?v=79kEX6Xmgxc tutorial's code is likely wrong - the test always returns true

    let name = component.planetForm.controls['name'];

    name.setValue('Earth');

    fixture.detectChanges();

    mockPlanetsService.fetchPlanet.and.returnValue(of({
      "id": "1",
      "name": "Earth",
      "size": 55.55,
      "distance": 55.55,
      "ordinality": 6,
      "description": ""
    }));

    tick(4000);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(name.hasError).toBeTruthy();
    })

  }));

  it('Async Validation testing - Planet Name NOT FOUND', fakeAsync(()=> {

    let name = component.planetForm.controls['name'];

    name.setValue('Earth');

    fixture.detectChanges();

    mockPlanetsService.fetchPlanet.and.returnValue(of(null));

    tick(4000);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(name.valid).toBeTruthy();
    })

  }));

  it('#onSubmit', () => {
    Object.defineProperty(component.planetForm, 'valid', {
      get: () => true
    });

    mockPlanetsService.addPlanet.and.returnValue(of({}));

    const spyformReset = spyOn(component.planetForm, 'reset').and.callThrough();

    component.onSubmit();

    fixture.detectChanges();

    expect(mockPlanetsService.addPlanet).toHaveBeenCalled();
    expect(spyformReset).toHaveBeenCalled();
  })

});