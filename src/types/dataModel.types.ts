export type FieldType = 'int' | 'string';

export type CalculateExpression = string | null;

export interface Field {
  label: string;
  type: FieldType;
  readOnly: boolean;
  value?: string;
  defaultValue?: string;
  utils?: string;
  calculate: CalculateExpression;
}

export interface DataModel {
  name: string;
  fields: {[key: string]: Field};
}
