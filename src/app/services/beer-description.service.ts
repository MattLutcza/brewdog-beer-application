import { Injectable } from '@angular/core';
import { Beer } from '../data-models/beer';

@Injectable()
export class BeerDescriptionService {

    private _backPageLink: string;
    private _selectedBeer: Beer;

    constructor() {}

    set backPageLink(backPageLink: string) {
        this._backPageLink = backPageLink;
    }

    get backPageLink(): string {
        return this._backPageLink;
    }

    set selectedBeer(selectedBeer: Beer) {
        this._selectedBeer = selectedBeer;
    }

    get selectedBeer(): Beer {
        return this._selectedBeer;
    }

}
