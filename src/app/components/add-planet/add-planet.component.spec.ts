import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanetComponent } from './add-planet.component';
import { PlanetsService } from 'src/app/service/planets.service';
import { ReactiveFormsModule } from '@angular/forms';

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

  // async validator causes problems
  // need to refactor to make easier to test
  // reset form may need to go in separate function

});
