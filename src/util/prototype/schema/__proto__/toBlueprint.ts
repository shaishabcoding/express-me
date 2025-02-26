import { Schema } from 'mongoose';

declare module 'mongoose' {
  interface Schema {
    toBlueprint(): string;
  }
}

const typeMap: Record<string, string> = {
  String: 'string',
  Number: 'number',
  Date: 'Date',
  ObjectId: 'ObjectId',
};

const getFieldType = (field: any): string =>
  field.instance === 'Embedded'
    ? `{${getBlueprintFromSchema(field.schema)}}`
    : (typeMap[field.instance] ?? 'unknown');

const getBlueprintFromSchema = (schema: Schema) =>
  Object.keys(schema.paths)
    .filter(path => path !== '_id' && path !== '__v')
    .map(
      path =>
        `${path}:${getFieldType(schema.paths[path])}${schema.paths[path].isRequired ? '' : '?'}`,
    )
    .join(',');

Schema.prototype.toBlueprint = function () {
  return `{${getBlueprintFromSchema(this)}}`;
};

export {};
