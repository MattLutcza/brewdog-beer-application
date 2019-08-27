import { async, inject, TestBed, ComponentFixture } from "@angular/core/testing";
import { BeerMenuPageComponent } from './beer-menu.component';
import { PunkService } from 'src/app/services/punk.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageHeaderComponent } from '../../partials/page-header/page-header.component';
import { BeerListComponent } from '../../partials/beer-list/beer-list.component';
import { of } from 'rxjs';

describe('BeerMenuPageComponent', () => {

    let fixture: ComponentFixture<BeerMenuPageComponent>;
    let component: BeerMenuPageComponent;

    let activatedRoute: ActivatedRoute;
    let punkService: PunkService;
    let routingService: RoutingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [BeerMenuPageComponent, PageHeaderComponent, BeerListComponent],
            providers: [PunkService, RoutingService, { provide: ActivatedRoute, useValue: { params: of({pageId: 1}) } }]
        }).compileComponents();
    }));

    beforeEach(inject([ActivatedRoute, PunkService, RoutingService], (_activatedRoute: ActivatedRoute, _punkService: PunkService, _routingService: RoutingService) => {
        activatedRoute = _activatedRoute;
        punkService = _punkService;
        routingService = _routingService;
        fixture = TestBed.createComponent(BeerMenuPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('should have no previous page when on page 1', async() => {
        TestBed.get(ActivatedRoute).params = of({pageId: 1});
        spyOn(punkService, 'retrieveBeerList').and.callFake(() => {
            const mockBeerResults = [];
            mockBeerResults.length = 80;
            return Promise.resolve(mockBeerResults);
        });

        await component.ngOnInit();
        expect(component.previousPageLink).toEqual('/home');
        expect(component.previousPageText).toEqual('Home');
        expect(component.beerList.length).toEqual(80);
    });

    it('should have previous page when not on page 1', async() => {
        TestBed.get(ActivatedRoute).params = of({pageId: 2});
        spyOn(punkService, 'retrieveBeerList').and.callFake(() => {
            const mockBeerResults = [];
            mockBeerResults.length = 80;
            return Promise.resolve(mockBeerResults);
        });

        await component.ngOnInit();
        expect(component.previousPageLink).toEqual('/beer-menu/1');
        expect(component.previousPageText).toEqual('Back');
        expect(component.beerList.length).toEqual(80);
    });

    it('should have no next page when less than 80 results are retrieved', async() => {
        spyOn(punkService, 'retrieveBeerList').and.callFake(() => {
            const mockBeerResults = [{id: 123, name: 'Beer'}, {id: 443, name: 'AnotherBeer'}, {id: 542, name: 'CheapBeer'}, {id: 543, name: 'CheapBeer'}];
            mockBeerResults.length = 60;
            return Promise.resolve(mockBeerResults);
        });

        await component.ngOnInit();
        expect(component.nextPageLink).toEqual('/home');
        expect(component.previousPageText).toEqual('Home');
        expect(component.beerList.length).toEqual(60);
    });

    it('should have next page when 80 results are retrieved', async() => {
        TestBed.get(ActivatedRoute).params = of({pageId: 3});
        spyOn(punkService, 'retrieveBeerList').and.callFake(() => {
            const mockBeerResults = [];
            mockBeerResults.length = 80;
            return Promise.resolve(mockBeerResults);
        });

        await component.ngOnInit();
        expect(component.nextPageLink).toEqual('/beer-menu/4');
        expect(component.nextPageText).toEqual('Next');
        expect(component.beerList.length).toEqual(80);

    });

    it('should redirect to page 1 if no results are retrieved', async() => {
        spyOn(punkService, 'retrieveBeerList').and.callFake(() => {
            const mockBeerResults = [];
            return Promise.resolve(mockBeerResults);
        });
        spyOn(routingService, 'navigateToBeerMenuPage');
        await component.ngOnInit();

        expect(routingService.navigateToBeerMenuPage).toHaveBeenCalledWith(1);
    });

});
