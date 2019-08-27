import { TestBed, inject } from "@angular/core/testing";
import { RoutingService } from './routing.service';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from '../app-routing.module';

import { HomePageComponent } from '../components/pages/home/home.component';
import { BeerMenuPageComponent } from '../components/pages/beer-menu/beer-menu.component';
import { BeerDescriptionPageComponent } from '../components/pages/beer-description/beer-description.component';
import { BeerSearchComponent } from '../components/pages/beer-search/beer-search.component';
import { PageHeaderComponent } from '../components/partials/page-header/page-header.component';
import { BeerListComponent } from '../components/partials/beer-list/beer-list.component';
import { Router } from '@angular/router';

describe('RoutingService', () => {

    let service: RoutingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RoutingService],
            imports: [
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [
                HomePageComponent,
                BeerMenuPageComponent,
                BeerDescriptionPageComponent,
                BeerSearchComponent,
                PageHeaderComponent,
                BeerListComponent
            ]
        });
    });

    beforeEach(inject([RoutingService], (_service: RoutingService) => {
        service = _service;
    }));

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should navigate to the home page', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        service.navigateToHomePage();
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should navigate to the menu page', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        const mockPageNumber = 2;
        service.navigateToBeerMenuPage(mockPageNumber);
        expect(router.navigate).toHaveBeenCalledWith(['/beer-menu', mockPageNumber]);
    });

    it('should navigate to the search page', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        service.navigateToSearchPage();
        expect(router.navigate).toHaveBeenCalledWith(['/beer-search']);
    });

    it('should navigate to the beer details page', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        const mockBeerId = 5;
        service.navigateToBeerDetailPage(mockBeerId);
        expect(router.navigate).toHaveBeenCalledWith(['/beer-description', mockBeerId]);
    });

    it('should navigate to the desired page', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        const page = '/home';
        service.navigateToPage(page);
        expect(router.navigate).toHaveBeenCalledWith([page]);
    });

});
