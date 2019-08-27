import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { PunkService } from 'src/app/services/punk.service';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';
import { PageHeaderComponent } from '../../partials/page-header/page-header.component';
import { BeerDescriptionPageComponent } from './beer-description.component';
import { of } from 'rxjs';



describe('BeerDescriptionPageComponent', () => {

    let fixture: ComponentFixture<BeerDescriptionPageComponent>;
    let component: BeerDescriptionPageComponent;
    let activatedRoute: ActivatedRoute;
    let beerDescriptionService: BeerDescriptionService;
    let punkService: PunkService;
    let routingService: RoutingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [BeerDescriptionPageComponent, PageHeaderComponent],
            providers: [ PunkService, BeerDescriptionService, RoutingService, { provide: ActivatedRoute, useValue: { params: of({ beerId: 123}) } } ]
        }).compileComponents();
    }));

    beforeEach(inject([ActivatedRoute, PunkService, BeerDescriptionService, RoutingService],
        (_activatedRoute: ActivatedRoute, _punkService: PunkService, _beerDescriptionService: BeerDescriptionService, _routingService: RoutingService) => {
            activatedRoute = _activatedRoute;
            punkService = _punkService;
            beerDescriptionService = _beerDescriptionService
            routingService = _routingService;
            fixture = TestBed.createComponent(BeerDescriptionPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    describe('if no beer is stored', () => {
        it('should retrieve beer from punkService', async() => {
            spyOn(punkService, 'retrieveSingleBeer').and.callFake(() => {
                const mockBeerResult = [{name: 'MockBeer'}];
                return Promise.resolve(mockBeerResult);
            });
            await component.ngOnInit();
            expect(punkService.retrieveSingleBeer).toHaveBeenCalledWith(123);
            expect(component.backPageText).toEqual('Back');
            expect(component.backPageLink).toEqual('/home');
            expect(component.beer.name).toEqual('MockBeer');
        });

        it('should attempt to retrieve beer from punkService, and redirect if punkService fails', async() => {
            spyOn(punkService, 'retrieveSingleBeer').and.callFake(() => {
                return Promise.reject();
            });
            spyOn(routingService, 'navigateToBeerDetailPage');
            await component.ngOnInit();
            expect(punkService.retrieveSingleBeer).toHaveBeenCalledWith(123);
            expect(routingService.navigateToBeerDetailPage).toHaveBeenCalledWith(1);
        });
    });

    describe('if a beer is stored', () => {
        it('should retrieve beer from beerDetailService if id matches', async() => {
            const mockBeer = { id: 123, name: 'MockBeer' };
            const mockPreviousPageLink = '/search';
            spyOnProperty(beerDescriptionService, 'selectedBeer').and.returnValue(mockBeer);
            spyOnProperty(beerDescriptionService, 'backPageLink').and.returnValue(mockPreviousPageLink);
            await component.ngOnInit();

            expect(component.backPageText).toEqual('Back');
            expect(component.backPageLink).toEqual(mockPreviousPageLink);
            expect(component.beer.name).toEqual(mockBeer.name);
            expect(component.beer.id).toEqual(mockBeer.id);
        });

        it('should retrieve beer from punkService if id doesn\'t match', async() => {
            const mockBeer = { id: 543, name: 'MockBeer' };
            spyOnProperty(beerDescriptionService, 'selectedBeer').and.returnValue(mockBeer);
            spyOn(punkService, 'retrieveSingleBeer').and.callFake(() => {
                const mockRightBeer = [ { id: 123, name: 'MockRightBeer'} ];
                return Promise.resolve(mockRightBeer);
            });
            await component.ngOnInit();
            expect(punkService.retrieveSingleBeer).toHaveBeenCalledWith(123);
            expect(component.beer.name).toEqual('MockRightBeer');
            expect(component.beer.id).toEqual(123);
        });
    });
});
