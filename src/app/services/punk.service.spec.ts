import { TestBed, inject } from "@angular/core/testing";
import { PunkService } from './punk.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('PunkService', () => {

    let service: PunkService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PunkService],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    beforeEach(inject([HttpTestingController, PunkService], (_httpMock: HttpTestingController, _service: PunkService) => {
        service = _service;
        httpMock = _httpMock;
    }));

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should retrieve a single beer based on the beer id', () => {
        // We call the service
        const mockBeerId = 100;
        service.retrieveSingleBeer(mockBeerId).then(response => {
            expect(response.data.length).toBe(1);
            expect(response.data[0].id).toEqual(mockBeerId);
        });


        const req = httpMock.expectOne('https://api.punkapi.com/v2/beers/' + mockBeerId);
        expect(req.request.method).toEqual('GET');

        // Then we set the fake data to be returned by the mock
        const fakeBeerData = [ { id: mockBeerId }];
        req.flush({data: fakeBeerData});
        httpMock.verify();
    });

    it('should retrieve multiple beers', () => {
        // We call the service
        const mockPageNumber = 4;
        service.retrieveBeerList(mockPageNumber).then(response => {
            expect(response.data.length).toBe(50);
            for(let counter = 0; counter < 50; counter = counter + 1) {
                expect(response.data[counter].id).toEqual(counter);
            }
        });


        const req = httpMock.expectOne('https://api.punkapi.com/v2/beers?per_page=80&page=' + mockPageNumber);
        expect(req.request.method).toEqual('GET');

        // Then we set the fake data to be returned by the mock
        const fakeBeerData = [];
        for(let counter = 0; counter < 50; counter = counter + 1) {
            fakeBeerData[counter] = { id : counter};
        }

        req.flush({data: fakeBeerData});
        httpMock.verify();
    });

    it('should retrieve multiple beers with the desired query parameters', () => {
        // Mock Query Parameters
        const mockQueryParameters = new Map();
        mockQueryParameters.set('testParam', '123');
        mockQueryParameters.set('anotherParam', 'test');

        // Call the service
        service.retrieveBeerListWithParameters(mockQueryParameters).then(response => {
            expect(response.data.length).toBe(50);
            for(let counter = 0; counter < 50; counter = counter + 1) {
                expect(response.data[counter].id).toEqual(counter);
            }
        });

        const req = httpMock.expectOne('https://api.punkapi.com/v2/beers?per_page=80&page=1&testParam=123&anotherParam=test');
        expect(req.request.method).toEqual('GET');

        // Then we set the fake data to be returned by the mock
        const fakeBeerData = [];
        for(let counter = 0; counter < 50; counter = counter + 1) {
            fakeBeerData[counter] = { id : counter};
        }

        req.flush({data: fakeBeerData});
        httpMock.verify();
    });

});
