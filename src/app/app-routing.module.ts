import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/pages/home/home.component';
import { BeerMenuPageComponent } from './components/pages/beer-menu/beer-menu.component';
import { BeerDescriptionPageComponent } from './components/pages/beer-description/beer-description.component';
import { BeerSearchComponent } from './components/pages/beer-search/beer-search.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'beer-menu/:pageId',
    component: BeerMenuPageComponent
  },
  {
    path: 'beer-menu',
    redirectTo: '/beer-menu/1',
  },
  {
    path: 'beer-description/:beerId',
    component: BeerDescriptionPageComponent
  },
  {
    path: 'beer-description',
    redirectTo: '/beer-menu'
  },
  {
    path: 'beer-search',
    component: BeerSearchComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
