import { Component } from '@angular/core';
import { PlanetsService } from 'src/app/service/planets.service';
import { Entries } from 'src/app/entries';
import { Planet } from 'src/app/planet';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private planetsService: PlanetsService) { }
  planets: Planet[] = [];

  ngOnInit() {
    this.fetchPlanets();
  }

  fetchPlanets() {
    // subscribe can only take one argument now vs having a callback for error handling
    // put all data under a entries key to help with TypeScript typing - not necessary?

    this.planetsService.fetchPlanets().subscribe({
      next: (data: Entries) => this.planets = data.entries,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

}
