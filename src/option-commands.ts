import { OptionType } from './enums/option-type';
import { OptionItem } from './models/option-item';

export const optionsCommands = new Map<OptionType, OptionItem>([
    [OptionType.QueryPath, { commands: ['query-path'], type: 'boolen', configPath: 'defaults.{resource}.QueryPath', description: 'Specifies if the style will be in the ts file.' }],
    [OptionType.HasList, { commands: ['has-list'], type: 'boolen', configPath: 'defaults.{resource}.HasList', description: 'Specifies if the template will be in the ts file.' }],
    [OptionType.HasProfile, { commands: ['has-profile'], type: 'boolen', configPath: 'defaults.{resource}.HasProfile', description: 'Specifies the view encapsulation strategy.' }],
    [OptionType.HasAdd, { commands: ['has-add'], type: 'boolen', configPath: 'defaults.{resource}.HasAdd', description: 'Specifies the change detection strategy.' }],
    [OptionType.ServiceApi, { commands: ['service-api'], configPath: 'defaults.{resource}.ServiceApi', description: 'select service api file.' }],
    [OptionType.ListMode, { commands: ['list-mode'],type: 'manual | config', configPath: 'defaults.{resource}.ListMode', description: 'The file extension to be used for style files.' }],
    [OptionType.PreviewMode, { commands: ['preview-mode'], type: 'manual | remote | config', configPath: 'defaults.{resource}.PreviewMode', description: 'Specifies if a spec file is generated.' }],
    [OptionType.Flat, { commands: ['flat'], type: 'boolen', configPath: 'defaults.{resource}.flat', description: 'Flag to indicate if a dir is created.' }],
    [OptionType.Plural, { commands: ['plual'], type: 'boolen',configPath: 'defaults.{resource}.Plural',  description: 'Flag to skip the module import' }],
    [OptionType.HasForm, { commands: ['has-form'], type: 'boolen', configPath: 'defaults.{resource}.HasForm', description: 'The selector to use for the component.' }],
    [OptionType.Property, { commands: ['property'], configPath: 'defaults.{resource}.Property', description: 'property name.' }],
    [OptionType.Model, { commands: ['model'], configPath: 'defaults.{resource}.Model',  description: 'if flat is true then we need to configure this' }],
    [OptionType.IndexModel, { commands: ['index-model'], configPath: 'defaults.{resource}.IndexModel',description: 'selet index model file.' }],
    [OptionType.HasAttachment, { commands: ['has-attachment'],type: 'boolen', configPath: 'defaults.{resource}.HasAttachment',  description: '' }],
    [OptionType.Name, { commands: ['name'], configPath: 'defaults.{resource}.Name', description: 'input the name of query.' }],
    [OptionType.HasFilter, { commands: ['has-filter'],type: 'boolen', description: 'Allow to override options' }],
    [OptionType.QueryServiceApi, { commands: ['query-service-api'], description: 'choose the query service api file' }],
]);