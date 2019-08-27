import { Component, Input, OnInit } from '@angular/core';

import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { RoutingService } from 'src/app/services/routing.service';
import { Beer } from 'src/app/data-models/beer';

@Component({
    selector: 'beer-list',
    styleUrls: ['./beer-list.component.css'],
    templateUrl: './beer-list.component.html'
})
export class BeerListComponent {

    @Input()
    beerList: Beer[];

    @Input()
    currentPage: string;

    constructor(private beerDescriptionService: BeerDescriptionService, private routingService: RoutingService) {}

    /**
     * Goes to the beer description page for the beer that was selected
     * @param beerItem - the beer that will be viewed on the beer description page
     * @param menuPageNumber - the beer menu page number that we will return to on back
     */
    goToBeerDescriptionPage(beerItem: Beer): void {
        this.beerDescriptionService.backPageLink = this.currentPage;
        this.beerDescriptionService.selectedBeer = beerItem;
        this.routingService.navigateToBeerDetailPage(beerItem.id);
    }

}
