import { getProjectConfig } from '@nrwl/workspace';
import { strings, normalize } from '@angular-devkit/core';
import {
  chain,
  apply,
  url,
  move,
  mergeWith,
  externalSchematic,
  applyTemplates,
  Rule,
  Tree,
  SchematicContext,
  MergeStrategy,
} from '@angular-devkit/schematics';

function generateBaseFiles(schema: any): Rule {
  if (!schema.name.startsWith('api-')) {
    throw new Error('APIs must start with api-');
  }

  return (tree: Tree, context: SchematicContext) =>
    chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name: schema.name,
        style: 'scss',
        linter: 'eslint',
      }),
      externalSchematic('@nrwl/angular', 'service', {
        name: schema.name,
        project: schema.name,
      }),
    ])(tree, context);
}

function addTemplateFiles(schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        dasherize: strings.dasherize,
      }),
      move(normalize(getProjectConfig(tree, schema.name).sourceRoot)),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)])(tree, context);
  };
}
export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) =>
    chain([generateBaseFiles(schema), addTemplateFiles(schema)])(tree, context);
}
