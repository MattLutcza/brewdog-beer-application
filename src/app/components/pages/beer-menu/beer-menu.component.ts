import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { PunkService } from 'src/app/services/punk.service';
import { RoutingService } from 'src/app/services/routing.service';

import { Beer } from 'src/app/data-models/beer';

@Component({
    templateUrl: './beer-menu.component.html',
    styleUrls: ['./beer-menu.component.css']
})
export class BeerMenuPageComponent implements OnInit, OnDestroy {

    readonly MAX_BEERS_PER_REQUEST = 80;

    routeParameterSubscription: Subscription;

    pageName: string;

    previousPageLink: string;
    previousPageText: string;
    nextPageLink: string;
    nextPageText: string;

    beerPageNumber: number;
    beerList: Beer[];

    constructor(
        private route: ActivatedRoute,
        private punkService: PunkService,
        private routingService: RoutingService
    ) { }

    /**
     * Initializes the component.
     */
    ngOnInit(): void {
        this.routeParameterSubscription = this.route.params.subscribe((routeParams) => {
            this.beerPageNumber = parseInt(routeParams.pageId, 10);
            this.pageName = '/beer-menu/' + this.beerPageNumber;
            this.determinePreviousPage(this.beerPageNumber !== 1);
            this.punkService.retrieveBeerList(this.beerPageNumber).then((beerResults: Beer[]) => {
                this.beerList = beerResults.sort(this.sortBeerByName);
                this.determineNextPage(this.beerList.length === this.MAX_BEERS_PER_REQUEST);

                // If the user tries to manually navigate to a menu page with a page number with no
                // results, then send the user back to the first menu page.
                if (this.beerList.length === 0) {
                    this.routingService.navigateToBeerMenuPage(1);
                }
            });
        });
    }

    /**
     * Destroys subscriptions.
     */
    ngOnDestroy(): void {
        this.routeParameterSubscription.unsubscribe();
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

    /**
     * If the menu page has a previous menu page, then it sets the previous page to the previous menu page.
     * Otherwise, it sets the previous page to the home page.
     * @param hasPreviousPage
     */
    private determinePreviousPage(hasPreviousPage: boolean): void {
        if (hasPreviousPage) {
            const previousBeerPageNumber = this.beerPageNumber - 1;
            this.previousPageLink = '/beer-menu/' + previousBeerPageNumber;
            this.previousPageText = 'Back';
        } else {
            this.previousPageLink = '/home';
            this.previousPageText = 'Home';
        }
    }

    /**
     * If the menu page has a next menu page, then it sets the next page to the next menu page.
     * Otherwise, it sets the next page to the home page.
     * @param hasNextPage
     */
    private determineNextPage(hasNextPage: boolean): void {
        if (hasNextPage) {
            const nextBeerPageNumber = this.beerPageNumber + 1;
            this.nextPageLink = '/beer-menu/' + nextBeerPageNumber;
            this.nextPageText = 'Next';
        } else {
            this.nextPageLink = '/home';
            this.nextPageText = 'Home';
        }
    }
}
