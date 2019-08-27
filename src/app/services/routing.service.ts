import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RoutingService {

    constructor(private router: Router) { }

    /**
     * Navigate to the home page
     */
    navigateToHomePage(): void {
        this.router.navigate(['/home']);
    }

    /**
     * Navigate to the beer search page
     */
    navigateToSearchPage(): void {
        this.router.navigate(['/beer-search']);
    }

    /**
     * Navigate to the menu page based on the page number desired
     * @param pageNumber - the page number of the menu page that will be navigated to
     */
    navigateToBeerMenuPage(pageNumber: number): void {
        this.router.navigate(['/beer-menu', pageNumber]);
    }

    /**
     * Navigate to the beer detail page
     * @param beerId - the id of the beer that will be viewed on the page
     */
    navigateToBeerDetailPage(beerId: number | string): void {
        this.router.navigate(['/beer-description', beerId]);
    }

    /**
     * Navigates to the page that is passed in.
     * @param page - the page to navigate to
     */
    navigateToPage(page: string): void {
        this.router.navigate([page]);
    }

}
