/* tslint:disable */
import { GrievanceAppealOverturnDispositionSectionModel } from './grievance-appeal-overturn-disposition-section-model';
import { GrievanceAppealAdministrativeActionsSectionModel } from './grievance-appeal-administrative-actions-section-model';
import { AppealDispositionModel } from './appeal-disposition-model';
import { HearingInformationModel } from './hearing-information-model';
import { GrievanceAppealInformationSectionModel } from './grievance-appeal-information-section-model';
import { AppellantSectionModel } from './appellant-section-model';
import { GrievanceAppealOverviewSectionModel } from './grievance-appeal-overview-section-model';
import { AppealRepresentativeSectionModel } from './appeal-representative-section-model';
import { GrievanceAppealWitnessSectionModel } from './grievance-appeal-witness-section-model';
export interface GrievanceAppealIndexModel {
  OverturnDispositionSection?: GrievanceAppealOverturnDispositionSectionModel;
  AdministrativeActionsSection?: GrievanceAppealAdministrativeActionsSectionModel;
  Disposition?: AppealDispositionModel;
  HearingInformation?: HearingInformationModel;
  InformationSection?: GrievanceAppealInformationSectionModel;
  Appellant?: AppellantSectionModel;
  OverviewSection?: GrievanceAppealOverviewSectionModel;
  Representative?: AppealRepresentativeSectionModel;
  Witness?: GrievanceAppealWitnessSectionModel;
  Key?: string;
  MetadataKey?: string;
}
