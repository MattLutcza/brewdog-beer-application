import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageHeaderComponent } from './page-header.component';

import { PunkService } from 'src/app/services/punk.service';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';

describe('PageHeaderComponent', () => {

    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                PageHeaderComponent
            ],
            providers: [
                PunkService,
                BeerDescriptionService,
                RoutingService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeDefined();
    });

    describe('for normal links', () => {

        let link: string;
        let routingService: RoutingService;

        beforeEach(() => {
            link = '/home';
            routingService = fixture.debugElement.injector.get(RoutingService);
            spyOn(routingService, 'navigateToPage');
        });

        it('should navigate to the provided link when the link is not /random', () => {
            component.navigateTo(link);
            expect(routingService.navigateToPage).toHaveBeenCalledWith(link);
        });
    });

    describe('for the \'random\' link', () => {

        let link: string;
        let routingService: RoutingService;
        let punkService: PunkService;
        let beerDescriptionService: BeerDescriptionService;

        beforeEach(() => {
            link = '/random';

            routingService = fixture.debugElement.injector.get(RoutingService);
            spyOn(routingService, 'navigateToBeerDetailPage');

            punkService = fixture.debugElement.injector.get(PunkService);
            spyOn(punkService, 'retrieveSingleBeer').and.callFake(() => {
                const beerResults = [{ id: 123}];
                return Promise.resolve(beerResults);
            });

            beerDescriptionService = fixture.debugElement.injector.get(BeerDescriptionService);
            spyOnProperty(beerDescriptionService, 'selectedBeer').and.callThrough();
        });

        it('should call the Punk API to get a random beer, then navigate to the description page', async() => {
            await component.navigateTo(link);
            expect(punkService.retrieveSingleBeer).toHaveBeenCalledWith('random');
            expect(beerDescriptionService.selectedBeer.id).toEqual(123);
            expect(routingService.navigateToBeerDetailPage).toHaveBeenCalledWith(123);
        });
    });
});
