import { getProjectConfig } from '@nrwl/workspace';
import { strings, normalize } from '@angular-devkit/core';
import {
  chain,
  apply,
  url,
  move,
  mergeWith,
  applyTemplates,
  Rule,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';

const generatePageFiles = (schema) => {
  return (tree, context) => {
    const moduleRoot = getProjectConfig(tree, schema.module).root;
    const pagesDir = `${moduleRoot}/src/lib/pages/${strings.dasherize(schema.name)}`;

    const templateSource = apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        module: schema.module,
        classify: strings.classify,
        dasherize: strings.dasherize,
      }),
      move(normalize(pagesDir)),
    ]);

    return mergeWith(templateSource);
  };
};

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => chain([generatePageFiles(schema)])(tree, context);
}
