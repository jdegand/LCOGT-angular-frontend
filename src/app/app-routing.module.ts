import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { AddPlanetComponent } from './components/add-planet/add-planet.component';

const routes: Routes = [
  { path: "details/:name", title: 'Details', component: DetailsPageComponent },
  { path: "add", title: 'Add Planet', component: AddPlanetComponent },
  { path: "HomepageComponent", component: HomepageComponent },
  { path: "", redirectTo: "/HomepageComponent", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
