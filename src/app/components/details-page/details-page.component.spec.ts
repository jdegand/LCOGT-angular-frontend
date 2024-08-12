import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPageComponent } from './details-page.component';
import { Planet } from 'src/app/planet';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { PlanetsService } from 'src/app/service/planets.service';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  let mockPlanetsSpy = jasmine.createSpyObj('PlanetsService', ['fetchPlanet']);

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [DetailsPageComponent],
      providers: [{
        provide: PlanetsService,
        useValue: mockPlanetsSpy
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => "Saturn", // doesn't need to match #fetchPlanet test's planet name  
            },
          },
        },
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fetchPlanet', () => {

    const mockPlanet: Planet = {
      "id": "1",
      "name": "Saturn",
      "size": 55.55,
      "distance": 55.55,
      "ordinality": 6,
      "description": ""
    }

    mockPlanetsSpy.fetchPlanet.and.returnValue(of(mockPlanet));
    
    component.fetchPlanetByName("Saturn");

    fixture.detectChanges();

    expect(component.planet).toEqual(mockPlanet);
  });

});