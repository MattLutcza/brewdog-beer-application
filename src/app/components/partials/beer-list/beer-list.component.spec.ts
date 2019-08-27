import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BeerListComponent } from "./beer-list.component";
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';
import { Beer } from 'src/app/data-models/beer';

describe('BeerListComponent', () => {

    let fixture: ComponentFixture<BeerListComponent>;
    let component: BeerListComponent;
    let beerDescriptionService: BeerDescriptionService;
    let routingService: RoutingService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [BeerListComponent],
            providers: [RoutingService, BeerDescriptionService]
        }).compileComponents()
    }));

    beforeEach(
        inject([BeerDescriptionService, RoutingService], (_beerDescriptionService: BeerDescriptionService, _routingService: RoutingService) => {
            beerDescriptionService = _beerDescriptionService;
            routingService = _routingService;
            fixture = TestBed.createComponent(BeerListComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should navigate to detail page for beer on click', () => {
        const mockBeer = { id: 4432, name: 'MockBeer' } as Beer;
        spyOn(routingService, 'navigateToBeerDetailPage');
        component.goToBeerDescriptionPage(mockBeer);
        expect(routingService.navigateToBeerDetailPage).toHaveBeenCalledWith(mockBeer.id);
    });

});
