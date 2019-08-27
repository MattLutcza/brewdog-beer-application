import { MeasurementDetail } from './measurement-detail';
import { IngredientMix } from './ingredient-mix';
import { CreationMethod } from './creation-method';

export class Beer {
    abv: number;
    attenuation_level: number;
    boil_volume: MeasurementDetail;
    brewers_tips: string;
    contributed_by: string;
    description: string;
    ebc: number;
    first_brewed: Date | string;
    food_pairing: string[];
    ibu: number;
    id: number;
    image_url: string;
    ingredients: IngredientMix;
    method: CreationMethod;
    name: string;
    ph: number;
    srm: number;
    tagline: string;
    target_fg: number;
    target_og: number;
    volume: MeasurementDetail;
}
