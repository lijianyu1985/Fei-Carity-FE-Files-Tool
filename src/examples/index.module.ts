import { BaseModule } from './base.module';
import { ReferenceModule} from './reference.module';

export interface IndexModel {
    currentModule?: string;
    baseModule?: BaseModule;
    referenceModule?: ReferenceModule;
}
