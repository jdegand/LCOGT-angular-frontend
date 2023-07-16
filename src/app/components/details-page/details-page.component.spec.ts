import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { DetailsPageComponent } from './details-page.component';
import { Planet } from 'src/app/planet';
import { ActivatedRoute } from '@angular/router';

import { of, throwError } from 'rxjs';
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
              get: () => "Mars", // represents planet name
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
});