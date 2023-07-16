import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlanetsService } from './planets.service';
import { Planet } from '../planet';
import { Entries } from '../entries';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanetsService]
    });
    service = TestBed.inject(PlanetsService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addPlanet', () => {

    const mockPlanet: Planet = {
      "name": "Earth",
      "size": 1,
      "distance": 1,
      "ordinality": 3,
      "description": "Spring Test"
    };

    service.addPlanet(mockPlanet).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.name).toBe("Earth");
    })

    const mockReq = testingController.expectOne("http://localhost:8080/planets");
    expect(mockReq.request.method).toEqual("POST");
    mockReq.flush(mockPlanet);
  })

  it('#fetchPlanets', () => {
    const mockPlanets: Entries = {
      "entries": [
        {
          "id": "1",
          "name": "Earth",
          "size": 1.0000,
          "distance": 1.000,
          "ordinality": 3,
          "description": "Spring Test"
        }
      ]
    }

    service.fetchPlanets().subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.entries.length).toBe(1);
    })

    const mockReq = testingController.expectOne("http://localhost:8080");
    expect(mockReq.request.method).toEqual("GET");
    mockReq.flush(mockPlanets);
  })

  it('#fetchPlanet', () => {
    const mockPlanet: Planet = {
      "id": "1",
      "name": "Earth",
      "size": 1.0000,
      "distance": 1.000,
      "ordinality": 3,
      "description": "Spring Test"
    }

    service.fetchPlanet("Earth").subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.name).toBe("Earth");
    })

    const mockReq = testingController.expectOne("http://localhost:8080/planets/detail/Earth");
    expect(mockReq.request.method).toEqual("GET");
    mockReq.flush(mockPlanet);
  })

})

