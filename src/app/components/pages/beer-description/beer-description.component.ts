import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { PunkService } from 'src/app/services/punk.service';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';
import { Beer } from 'src/app/data-models/beer';
import { RoutingService } from 'src/app/services/routing.service';


@Component({
    templateUrl: './beer-description.component.html',
    styleUrls: ['./beer-description.component.css']
})
export class BeerDescriptionPageComponent implements OnInit, OnDestroy {

    backPageLink: string;
    backPageText: string;

    beer: Beer;

    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private punkService: PunkService, private beerDescriptionService: BeerDescriptionService, private routingService: RoutingService) { }

    /**
     *
     */
    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((routeParams) => {
            const beerId = parseInt(routeParams.beerId, 10);
            this.backPageText = 'Back';

            // If the id matches the id of the beer stored in the shared service, then
            // there is no need to call the punk API.
            if (this.beerDescriptionService.selectedBeer && this.beerDescriptionService.selectedBeer.id === beerId) {
                this.beer = this.beerDescriptionService.selectedBeer;
                this.backPageLink = this.beerDescriptionService.backPageLink;
            } else {
                this.backPageLink = '/home';
                // If there is no beer stored in the shared service, or if it doesn't match the beer that is in the
                // shared service then call the punk API with the beerId
                this.punkService.retrieveSingleBeer(beerId).then((beerResults: Beer[]) => {
                    this.beer = beerResults.pop();
                }, () => {
                    // If the beerId doesn't exist, then navigate and show details of beerId 1
                    this.routingService.navigateToBeerDetailPage(1);
                });
            }
        });
    }

    /**
     *
     */
    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
