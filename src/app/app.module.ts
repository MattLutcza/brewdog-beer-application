// Angular Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Application Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Page Components
import { HomePageComponent } from './components/pages/home/home.component';
import { BeerMenuPageComponent } from './components/pages/beer-menu/beer-menu.component';
import { BeerDescriptionPageComponent } from './components/pages/beer-description/beer-description.component';
import { BeerSearchComponent } from './components/pages/beer-search/beer-search.component';

// Common Components
import { BeerListComponent } from './components/partials/beer-list/beer-list.component';
import { PageHeaderComponent } from './components/partials/page-header/page-header.component';

// Providers
import { PunkService } from './services/punk.service';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BeerMenuPageComponent,
    BeerDescriptionPageComponent,
    BeerSearchComponent,
    BeerListComponent,
    PageHeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    PunkService,
    BeerDescriptionService,
    RoutingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
