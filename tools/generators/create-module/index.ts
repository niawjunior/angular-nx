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

const libPath = '/src/lib';

function generateBaseLibrary(schema: any): Rule {
  if (!schema.name.startsWith('module-')) {
    throw new Error('Modules must start with module-');
  }

  return externalSchematic('@nrwl/angular', 'lib', {
    name: schema.name,
    style: 'scss',
    routing: false,
    linter: 'eslint',
  });
}

function generateFiles(schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const moduleClassName = strings.classify(schema.name.replace('module-', ''));

    const templateSource = apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        className: moduleClassName,
        classify: strings.classify,
        dasherize: strings.dasherize,
        camelize: strings.camelize,
      }),
      move(normalize(`${getProjectConfig(tree, schema.name).root}${libPath}`)),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)])(tree, context);
  };
}

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) =>
    chain([generateBaseLibrary(schema), generateFiles(schema)])(tree, context);
}
