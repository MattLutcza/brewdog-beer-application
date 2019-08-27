import { FermentationStepDetail } from './fermentation-step-detail';
import { MashStepDetail } from './mash-step-detail';

export class CreationMethod {
    fermentation: FermentationStepDetail;
    mash_temp: MashStepDetail[];
    twist: string;
}
