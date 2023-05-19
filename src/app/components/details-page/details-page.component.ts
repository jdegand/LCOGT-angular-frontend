import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlanetsService } from 'src/app/service/planets.service';
import { Planet } from '../../planet';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {
  constructor(private route: ActivatedRoute, private planetsService: PlanetsService) {}
  planet?:Planet | null = undefined;

  ngOnInit() {
    const planetName = this.route.snapshot.paramMap.get('name');
    console.log('planetName', planetName)
    if(planetName){
      this.fetchPlanet(planetName);
    }
  }

  fetchPlanet(name: string){
    this.planetsService.fetchPlanet(name).subscribe((planet)=> {
      this.planet = planet;
    });
  }

}
