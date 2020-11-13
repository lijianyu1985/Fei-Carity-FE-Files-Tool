import { BaseModule } from './base.module';

export interface ReferenceModule {
    key?: string;
    referenceName?: string;
    description?: string;
    params?: Array<BaseModule>;
}
