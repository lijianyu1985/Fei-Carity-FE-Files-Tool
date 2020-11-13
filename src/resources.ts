import * as path from 'path';
import { TemplateType } from './enums/template-type';
import { ResourceType } from './enums/resource-type';
import { IResource } from './models/resource';
import { OptionType } from './enums/option-type';

export const resources = new Map<ResourceType, IResource>([
  [ResourceType.Environment, {
    locDirName: (loc, config) => (!config.defaults.module.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [{ name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml },
    { name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `module.ts`, type: TemplateType.Module },
    { name: config => `-routing.module.ts`, type: TemplateType.ModuleRouting, condition: (config, params) => config.defaults.module.routing },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.module.spec }],
    createFolder: config => !config.defaults.module.flat,
    options: [OptionType.QueryPath]
  }],
  [ResourceType.Query, {
    files: [{ name: config => `enum.ts`, type: TemplateType.Enum }],
    options: [OptionType.Name,
    OptionType.HasFilter,]
  }],
  [ResourceType.QueryRoot, {
    files: [{ name: config => `routing.ts`, type: TemplateType.Route }],
    options: [
      OptionType.QueryServiceApi
    ]
  }],
  [ResourceType.Router, {
    files: [{ name: config => `ts`, type: TemplateType.Inteface }],
    options: [OptionType.HasList,
    OptionType.HasProfile,
    OptionType.HasAdd]
  }],
  [ResourceType.Services, { files: [{ name: config => `enum.ts`, type: TemplateType.Enum }] }],
  [ResourceType.RootModule, { files: [{ name: config => `enum.ts`, type: TemplateType.Enum }] }],
  [ResourceType.Add, {
    files: [
      { name: config => `ts`, type: TemplateType.Class },
      { name: config => `spec.ts`, type: TemplateType.ClassSpec, condition: (config, params) => config.defaults.class.spec },
    ],
    options: [OptionType.ServiceApi],
  }],
  [ResourceType.Panel, {
    locDirName: (loc, config) => (!config.defaults.service.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `panel.component.ts`, type: TemplateType.Service, condition: (config, params) => config.version === 'ng5' },
      { name: config => `panel.component.html`, type: TemplateType.ServiceNg6, condition: (config, params) => config.version === 'ng6' },
    ],
    createFolder: config => !config.defaults.service.flat,
    options: [OptionType.Plural,
    OptionType.HasForm,
    OptionType.Property,
    ],
  }],
  [ResourceType.PanelForm, {
    locDirName: (loc, config) => (!config.defaults.pipe.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `form.component.ts`, type: TemplateType.Pipe },
      { name: config => `form.component.html`, type: TemplateType.PipeSpec, condition: (config, params) => config.defaults.pipe.spec },
    ],
    createFolder: config => !config.defaults.pipe.flat,
    declaration: 'form',
    options: [OptionType.Flat,
    OptionType.Model,
    ],
  }],
  [ResourceType.Profile, {
    locDirName: (loc, config) => (!config.defaults.directive.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'directive',
    files: [
      { name: config => `directive.ts`, type: TemplateType.Directive },
      { name: config => `directive.spec.ts`, type: TemplateType.DirectiveSpec, condition: (config, params) => config.defaults.directive.spec },
    ],
    createFolder: config => !config.defaults.directive.flat,
    options: [OptionType.IndexModel,
    OptionType.ServiceApi,
    OptionType.HasAttachment,
    ],
  }],
  [ResourceType.List, {
    locDirName: (loc, config) => (!config.defaults.component.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'component',
    files: [{ name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle, condition: (config, params) => !config.defaults.component.inlineStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml, condition: (config, params) => !config.defaults.component.inlineTemplate },
    { name: config => `service.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.component.spec },
    { name: config => `module.ts`, type: TemplateType.Module },
    ],
    createFolder: config => !config.defaults.component.flat,
    options: [OptionType.ListMode,
    OptionType.PreviewMode,
    ],
  }],
]);
