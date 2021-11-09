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

const generateComponentFiles = (schema) => {
  return (tree, context) => {
    const pagesDir = `libs/shared/src/lib/components/${strings.dasherize(
      schema.name
    )}`;
    const moduleClassName = strings.classify(schema.name);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        className: moduleClassName,
        classify: strings.classify,
        dasherize: strings.dasherize,
        camelize: strings.camelize,
      }),
      move(normalize(pagesDir)),
    ]);

    return mergeWith(templateSource);
  };
};

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) =>
    chain([generateComponentFiles(schema)])(tree, context);
}
