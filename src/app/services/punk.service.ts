import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable()
export class PunkService {

    readonly PUNK_API_BASE_URL = 'https://api.punkapi.com/v2/beers';

    private menuPageResultCache: Map<number, any>;

    constructor(private httpClient: HttpClient) {
        this.menuPageResultCache = new Map();
    }

    /**
     * Calls the punk API with the beer id that is desired. Can be a number, or the string 'random'
     * @param beerId - the id of the beer to call the punk API with
     */
    retrieveSingleBeer(beerId: number | string): Promise<any> {
        const punkURL = this.PUNK_API_BASE_URL + '/' + beerId;
        return this.httpClient.get(punkURL).toPromise();
    }

    /**
     * Calls the punk API expecting results back based on the page number passed in
     * @param pageNumber - the page number representing the page of results, since the punk api returns a max of 80 items 'per page'
     */
    retrieveBeerList(pageNumber: number): Promise<any>  {
        const punkURL = this.PUNK_API_BASE_URL + '?per_page=80&page=' + pageNumber;

        // If the beers are already cached for the page, grab them from the cache.
        if (this.menuPageResultCache.get(pageNumber)) {
            return Promise.resolve(this.menuPageResultCache.get(pageNumber));
        } else {
            // Otherwise, call the punk API, cache the results, and then return the results.
            return this.httpClient.get(punkURL).pipe(
                tap(results => this.menuPageResultCache.set(pageNumber, results))
            ).toPromise();
        }
    }

    retrieveBeerListWithParameters(searchQuery: Map<string, string>): Promise<any> {
        let punkURL = this.PUNK_API_BASE_URL + '?per_page=80&page=1';

        // Construct the punk API URL based on the search parameters passed in.
        searchQuery.forEach((value, key) => {
            punkURL = punkURL + '&' + key + '=' + value;
        });

        return this.httpClient.get(punkURL).toPromise();
    }
}
