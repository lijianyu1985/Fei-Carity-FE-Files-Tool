import { ResourceType } from './enums/resource-type';

export const commandsMap = new Map([
    ['extension.carityEnvironment', { fileName: 'carity environment', resource: ResourceType.Environment }],
    ['extension.carityRouter', { fileName: 'carity router', resource: ResourceType.Router }],
    ['extension.carityAdd', { fileName: 'carity add', resource: ResourceType.Add }],
    ['extension.carityList', { fileName: 'carity list', resource: ResourceType.List }],
    ['extension.carityPanel', { fileName: 'carity panel', resource: ResourceType.Panel }],
    ['extension.carityPanelForm', { fileName: 'carity panel form', resource: ResourceType.PanelForm }],
    ['extension.carityProfile', { fileName: 'carity profile', resource: ResourceType.Profile }],
    ['extension.carityQuery', { fileName: 'carity query', resource: ResourceType.Query }],
    ['extension.carityQueryRoot', { fileName: 'carity query root', resource: ResourceType.QueryRoot }],
    ['extension.carityService', { fileName: 'carity service', resource: ResourceType.Services }],
    ['extension.carityRootModule', { fileName: 'carity root module', resource: ResourceType.RootModule }]
]);
