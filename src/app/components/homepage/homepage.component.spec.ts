import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { PlanetsService } from 'src/app/service/planets.service';
import { Entries } from 'src/app/entries';
import { RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let mockPlanetsService = jasmine.createSpyObj(['fetchPlanets']);

  const mockPlanets: Entries = {
    "entries": [
      {
        "id": "1",
        "name": "Earth",
        "size": 1.0000,
        "distance": 1.000,
        "ordinality": 3,
        "description": "Spring Test"
      },
      {
        "id": "2",
        "name": "Mars",
        "size": 0.107,
        "distance": 1.41,
        "ordinality": 4,
        "description": "Matt Damon made the comedy `The Martian` about this planet."
      }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [RouterModule.forRoot([])],
      providers: [{
        provide: PlanetsService,
        useValue: mockPlanetsService
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fetchPlanets', () => {
    mockPlanetsService.fetchPlanets.and.returnValue(of(mockPlanets));
    fixture.detectChanges();
    expect(component.planets.length).toEqual(mockPlanets.entries.length);
  })

  it('#fetchPlanets error', () => {
    mockPlanetsService.fetchPlanets.and.returnValue(throwError(() => new Error()));
    fixture.detectChanges();
    expect(component.planets.length).toEqual(0);
  })

});
