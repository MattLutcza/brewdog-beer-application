import { HopIngredient } from './hop-ingredient';
import { MaltIngredient } from './malt-ingredient';

export class IngredientMix {
    hops: HopIngredient[];
    malt: MaltIngredient[];
    yeast: string;
}
