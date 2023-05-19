import { Component } from '@angular/core';
import { PlanetsService } from 'src/app/service/planets.service';
import { Entries } from 'src/app/entries';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private planetsService: PlanetsService){}
    planets: any = [];

    ngOnInit(){
      this.fetchPlanets();
    }

    fetchPlanets(){
      // subscribe can only take one argument now

      /*
      this.planetsService.fetchPlanets().subscribe((data) => {
        this.planets = data.entries;
      });
      */

      this.planetsService.fetchPlanets().subscribe({
        next: (data) => this.planets = data.entries,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })


    }

}
