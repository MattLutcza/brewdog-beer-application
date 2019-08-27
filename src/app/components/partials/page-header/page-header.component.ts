import { Component, Input } from '@angular/core';

import { PunkService } from 'src/app/services/punk.service';
import { RoutingService } from 'src/app/services/routing.service';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';

import { Beer } from 'src/app/data-models/beer';

@Component({
    selector: 'page-header',
    styleUrls: ['./page-header.component.css'],
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

    @Input()
    linkOne: string;

    @Input()
    linkTwo: string;

    @Input()
    linkOneText: string;

    @Input()
    linkTwoText: string;

    @Input()
    pageHeader: string;

    constructor(private punkService: PunkService, private beerDescriptionService: BeerDescriptionService, private routingService: RoutingService) { }

    navigateTo(link: string): void {
        // Need to do something special if the link is the random link.
        if (link === '/random') {
            this.punkService.retrieveSingleBeer('random').then((beerResults: Beer[]) => {
                const randomBeer = beerResults[0];
                this.beerDescriptionService.selectedBeer = randomBeer;
                this.routingService.navigateToBeerDetailPage(randomBeer.id);
            });
        } else {
            this.routingService.navigateToPage(link);
        }


    }
}
