import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { PunkService } from 'src/app/services/punk.service';
import { BeerSearchComponent } from './beer-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageHeaderComponent } from '../../partials/page-header/page-header.component';
import { BeerListComponent } from '../../partials/beer-list/beer-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';

describe('BeerSearchComponent', () => {

    let fixture: ComponentFixture<BeerSearchComponent>;
    let component: BeerSearchComponent;
    let punkService: PunkService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [BeerSearchComponent, PageHeaderComponent, BeerListComponent],
            providers: [PunkService, BeerDescriptionService, RoutingService]
        }).compileComponents();
    }));

    beforeEach(inject([PunkService], (_punkService: PunkService) => {
        punkService = _punkService;
        fixture = TestBed.createComponent(BeerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should add search criteria', ()=> {
        const searchKeyOne = 'testKeyOne';
        const searchValue = 'testSearchValue';
        const searchValueUpdate = 'newTestSearchValue';
        const searchKeyTwo = 'testKeyTwo';
        const searchValueTwo = 'testSearchValueTwo';

        // start off with no search criteria
        expect(component.beerSearchParameters.size).toEqual(0);

        // Add one
        component.addSearchCriteria(searchKeyOne, searchValue);
        expect(component.beerSearchParameters.get(searchKeyOne)).toEqual(searchValue);
        expect(component.beerSearchParameters.size).toEqual(1);

        // Add two
        component.addSearchCriteria(searchKeyTwo, searchValueTwo);
        expect(component.beerSearchParameters.get(searchKeyTwo)).toEqual(searchValueTwo);
        expect(component.beerSearchParameters.size).toEqual(2);

        // Edit the first one
        component.addSearchCriteria(searchKeyOne, searchValueUpdate);
        expect(component.beerSearchParameters.get(searchKeyOne)).toEqual(searchValueUpdate);
        expect(component.beerSearchParameters.size).toEqual(2);

        // Clear out the second one
        component.addSearchCriteria(searchKeyTwo, '');
        expect(component.beerSearchParameters.has(searchKeyTwo)).toBeFalsy();
        expect(component.beerSearchParameters.size).toEqual(1);
    });

    it('should show error if search is triggered with no search criteria', () => {
        expect(component.beerSearchParameters.size).toEqual(0);
        component.retrieveSearchResults();
        expect(component.shouldShowSearchError).toBeTruthy();
    });

    it('should retrieve search results from punkService if there are search criteria', async() => {
        const mockSearchCriteriaMap = new Map<string, string>();
        mockSearchCriteriaMap.set('searchByName','testName');
        spyOn(punkService,'retrieveBeerListWithParameters').and.callFake(() => {
            const mockBeerResults = [{id: 123, name: 'Beer'}, {id: 443, name: 'AnotherBeer'}, {id: 542, name: 'CheapBeer'}, {id: 543, name: 'CheapBeer'}];
            return Promise.resolve(mockBeerResults);
        });
        component.beerSearchParameters = mockSearchCriteriaMap;
        await component.retrieveSearchResults();
        expect(component.beerSearchResults.length).toEqual(4);
        expect(component.beerSearchResults[0].id).toEqual(443);
        expect(component.beerSearchResults[1].id).toEqual(123);
        expect(component.beerSearchResults[2].id).toEqual(542);
        expect(component.beerSearchResults[3].id).toEqual(543);
    });

    it('should retrieve search results from punkService if there are search criteria, and show info message if there are too many results', async() => {
        const mockSearchCriteriaMap = new Map<string, string>();
        mockSearchCriteriaMap.set('searchByName','testName');
        spyOn(punkService,'retrieveBeerListWithParameters').and.callFake(() => {
            const mockBeerResults = [];
            mockBeerResults.length = 80; // Add on more items
            return Promise.resolve(mockBeerResults);
        });
        component.beerSearchParameters = mockSearchCriteriaMap;
        await component.retrieveSearchResults();
        expect(component.beerSearchResults.length).toEqual(80);
        expect(component.shouldShowManyResultsMessage).toBeTruthy();
    });

    it('should show no results message if search doesn\'t return results', async() => {
        const mockSearchCriteriaMap = new Map<string, string>();
        mockSearchCriteriaMap.set('searchByName','testNameThatWillFindNothing');
        spyOn(punkService,'retrieveBeerListWithParameters').and.callFake(() => {
            const mockBeerResults = [];
            return Promise.resolve(mockBeerResults);
        });
        component.beerSearchParameters = mockSearchCriteriaMap;
        await component.retrieveSearchResults();
        expect(component.beerSearchResults.length).toEqual(0);
        expect(component.shouldShowNoResultsMessage).toBeTruthy();
    });

    it('should show no results message if search fails', async() => {
        const mockSearchCriteriaMap = new Map<string, string>();
        mockSearchCriteriaMap.set('badSearchParameter','testName');
        spyOn(punkService,'retrieveBeerListWithParameters').and.callFake(() => {
            return Promise.reject();
        });
        component.beerSearchParameters = mockSearchCriteriaMap;
        await component.retrieveSearchResults();
        expect(component.beerSearchResults.length).toEqual(0);
        expect(component.shouldShowNoResultsMessage).toBeTruthy();
    });

})
