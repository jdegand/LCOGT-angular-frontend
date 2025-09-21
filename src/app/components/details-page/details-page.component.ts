import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from 'src/app/service/planets.service';
import { Planet } from '../../planet';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html'
})
export class DetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private planetsService: PlanetsService) { }
  planet?: Planet | null = undefined;

  planetName: string | null | undefined;

  ngOnInit() {
    this.planetName = this.route.snapshot.paramMap.get('name');
    if (this.planetName) {
      this.fetchPlanetByName(this.planetName);
    }
  }

  fetchPlanetByName(name: string) {
    this.planetsService.fetchPlanet(name).subscribe((planet) => {
      this.planet = planet;
    });
  }

}
