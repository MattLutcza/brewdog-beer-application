import { Component } from '@angular/core';

import { Beer } from 'src/app/data-models/beer';
import { PunkService } from 'src/app/services/punk.service';

@Component({
    styleUrls: ['./beer-search.component.css'],
    templateUrl: './beer-search.component.html'
})
export class BeerSearchComponent {

    beerSearchParameters: Map<string,string>;
    beerSearchResults: Beer[];
    pageName: string;
    shouldShowSearchError: boolean;
    shouldShowNoResultsMessage: boolean;
    shouldShowManyResultsMessage: boolean;
    shouldShowLoadingMessage: boolean;

    constructor(private punkService: PunkService) {
        this.beerSearchParameters = new Map<string, string>();
        this.pageName = '/beer-search';
    }

    /**
     *
     * @param searchCriteria
     * @param searchCriteriaValue
     */
    addSearchCriteria(searchCriteria: string, searchCriteriaValue: string): void {
        if (searchCriteriaValue) {
            this.beerSearchParameters.set(searchCriteria, searchCriteriaValue);
        } else {
            this.beerSearchParameters.delete(searchCriteria);
        }
    }

    /**
     *
     */
    retrieveSearchResults(): void {
        // Reset errors and messages
        this.shouldShowSearchError = false;
        this.shouldShowNoResultsMessage = false;
        this.shouldShowManyResultsMessage = false;
        this.beerSearchResults = [];

        // If the user didn't input any search parameters, then clear out any previous
        // search results and show error.
        if (this.beerSearchParameters.size === 0) {
            this.shouldShowSearchError = true;
        } else {
            // Otherwise, retrieve search results.
            this.shouldShowLoadingMessage = true;
            this.punkService.retrieveBeerListWithParameters(this.beerSearchParameters).then((beerResults: Beer[]) => {
                this.beerSearchResults = beerResults.sort(this.sortBeerByName);
                this.shouldShowLoadingMessage = false;

                // If we hit the max number of results, then display a message to the user.
                if (this.beerSearchResults.length === 0) {
                    this.shouldShowNoResultsMessage = true;
                } else if (this.beerSearchResults.length === 80) {
                    this.shouldShowManyResultsMessage = true;
                }
            }, () => {
                this.shouldShowLoadingMessage = false;
                this.shouldShowNoResultsMessage = true;
            });
        }
    }

    /**
     * Private function used for sorting the beer data by name
     * @param beerOne - object one being compared
     * @param beerTwo - object two being compared
     */
    private sortBeerByName(beerOne: Beer, beerTwo: Beer): number {
        if (beerOne.name < beerTwo.name) {
            return -1;
        } else if (beerOne.name > beerTwo.name) {
            return 1;
        }
        return 0;
    }

}
