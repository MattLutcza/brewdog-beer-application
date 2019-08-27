import { Component} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PunkService } from 'src/app/services/punk.service';
import { RoutingService } from 'src/app/services/routing.service';
import { Beer } from 'src/app/data-models/beer';
import { BeerDescriptionService } from 'src/app/services/beer-description.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('rotatedState', [
            state('first-rotation', style({ transform: 'rotatey(0deg)' })), // start at 0deg
            state('second-rotation', style({ transform: 'rotatey(180deg)' })), // flip 180deg
            transition('second-rotation => first-rotation', animate('800ms ease-in')),
            transition('first-rotation => second-rotation', animate('800ms ease-in'))
        ])
    ]
})
export class HomePageComponent {

    imageRotationValue = 'first-rotation';

    applicationInformationCollapsableOpen: boolean;

    constructor(private punkService: PunkService, private routingService: RoutingService, private beerDescriptionService: BeerDescriptionService) { }

    /**
     * Triggers the animation of the logo image, causing the image to rotate.
     */
    triggerImageAnimation(): void {
        this.imageRotationValue = (this.imageRotationValue === 'first-rotation' ? 'second-rotation' : 'first-rotation');
    }

    /**
     * Reveals the element passed in, expanding it downwards.
     * @param elementToOpenClose - The hidden content that will be opened
     */
    openCloseInformation(elementToOpenClose: any): void {
        this.applicationInformationCollapsableOpen = !this.applicationInformationCollapsableOpen;
        if (elementToOpenClose.style.maxHeight){
            elementToOpenClose.style.maxHeight = null;
        } else {
            elementToOpenClose.style.maxHeight = elementToOpenClose.scrollHeight + 25 + "px";
        }
    }

    /**
     * Navigates to the start of the beer menu.
     */
    navigateToBeerMenuPage(): void {
        this.routingService.navigateToBeerMenuPage(1);
    }

    /**
     * Navigates to the beer search page.
     */
    navigateToBeerSearchPage(): void {
        this.routingService.navigateToSearchPage();
    }

    /**
     * Calls the punk API for a random beer and then navigates to the beer description page
     * to view the random beer details.
     */
    navigateToRandomBeerPage(): void {
        this.punkService.retrieveSingleBeer('random').then((beerResults: Beer[]) => {
            const randomBeer = beerResults[0];
            this.beerDescriptionService.selectedBeer = randomBeer;
            this.beerDescriptionService.backPageLink = '/home';
            this.routingService.navigateToBeerDetailPage(randomBeer.id);
        });
    }
}
