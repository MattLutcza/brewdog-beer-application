import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePageComponent } from './home.component';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { PunkService } from 'src/app/services/punk.service';
import { RoutingService } from 'src/app/services/routing.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomePageComponent', () => {

    let fixture: ComponentFixture<HomePageComponent>;
    let component: HomePageComponent;
    let beerDescriptionService: BeerDescriptionService;
    let punkService: PunkService;
    let routingService: RoutingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [HomePageComponent],
            providers: [PunkService, RoutingService, BeerDescriptionService]
        }).compileComponents()
    }));

    beforeEach(
        inject([BeerDescriptionService, PunkService, RoutingService], (_beerDescriptionService: BeerDescriptionService, _punkService: PunkService, _routingService: RoutingService) => {
            beerDescriptionService = _beerDescriptionService;
            punkService = _punkService;
            routingService = _routingService;
            fixture = TestBed.createComponent(HomePageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should change the animation state on click', () => {
        expect(component.imageRotationValue).toEqual('first-rotation');
        component.triggerImageAnimation();
        expect(component.imageRotationValue).toEqual('second-rotation');
        component.triggerImageAnimation();
        expect(component.imageRotationValue).toEqual('first-rotation');
    });

    it('should toggle the max height of the expandable section on click', () => {
        const mockExpandCollapseElement = {
            scrollHeight: 50,
            style: {
                maxHeight: null
            }
        };

        // Open
        component.openCloseInformation(mockExpandCollapseElement);
        expect(mockExpandCollapseElement.style.maxHeight).toEqual('75px');
        expect(component.applicationInformationCollapsableOpen).toBeTruthy();

        // Close
        component.openCloseInformation(mockExpandCollapseElement);
        expect(mockExpandCollapseElement.style.maxHeight).toBeNull();
        expect(component.applicationInformationCollapsableOpen).toBeFalsy();
    });

    it('should navigate to beer menu page', () => {
        spyOn(routingService, 'navigateToBeerMenuPage');
        component.navigateToBeerMenuPage();
        expect(routingService.navigateToBeerMenuPage).toHaveBeenCalledWith(1);
    });

    it('should navigate to beer search page', () => {
        spyOn(routingService, 'navigateToSearchPage');
        component.navigateToBeerSearchPage();
        expect(routingService.navigateToSearchPage).toHaveBeenCalled();
    });

    it('should navigate to the random beer page', async() => {
        spyOn(punkService, 'retrieveSingleBeer').and.callFake(()=> {
            const mockBeerResults = [{ id: 123 }];
            return Promise.resolve(mockBeerResults);
        });
        spyOn(routingService, 'navigateToBeerDetailPage');
        spyOnProperty(beerDescriptionService, 'selectedBeer').and.callThrough();
        spyOnProperty(beerDescriptionService, 'backPageLink').and.callThrough();
        await component.navigateToRandomBeerPage();
        expect(beerDescriptionService.selectedBeer.id).toEqual(123);
        expect(beerDescriptionService.backPageLink).toEqual('/home');
        expect(routingService.navigateToBeerDetailPage).toHaveBeenCalledWith(123);
    });
});
