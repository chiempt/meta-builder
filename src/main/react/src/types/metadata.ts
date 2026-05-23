export type FieldType = 'TEXT' | 'EMAIL' | 'ENUM' | 'RELATION' | 'CURRENCY' | 'DATE' | 'NUMBER' | 'BOOLEAN';

export interface UIConfig {
  placeholder?: string;
  width?: 'full' | 'half' | 'quarter';
  section?: string;
  renderAs?: 'badge' | 'dropdown' | 'radio';
  aggregatable?: boolean;
  aggregations?: string[];
}

export interface ValidationConfig {
  minLength?: number;
  maxLength?: number;
  pattern?: string | null;
  format?: string;
}

export interface EnumOption {
  value: string;
  label: string;
  color?: string;
}

export interface EnumConfig {
  options: EnumOption[];
}

export interface RelationConfig {
  targetEntity: string;
  relationType: 'MANY_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY' | 'ONE_TO_ONE';
  displayField: string;
  filterByCurrentUser?: boolean;
}

export interface PermissionConfig {
  visibleRoles?: string[];
  editableRoles?: string[];
}

export interface CurrencyConfig {
  currency: string;
  precision: number;
}

export interface FieldMetadata {
  name: string;
  displayName: string;
  fieldType: FieldType;
  isRequired?: boolean;
  isSearchable?: boolean;
  isUnique?: boolean;
  defaultValue?: unknown;
  uiConfig?: UIConfig;
  validationConfig?: ValidationConfig;
  enumConfig?: EnumConfig;
  relationConfig?: RelationConfig;
  permissionConfig?: PermissionConfig;
  currencyConfig?: CurrencyConfig;
}

export interface MetaConfig {
  icon?: string;
  color?: string;
  searchable?: boolean;
  softDelete?: boolean;
  auditEnabled?: boolean;
  defaultSort?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
}

export interface EntityMetadata {
  id: string;
  tenantId: string;
  name: string;
  displayName: string;
  tableName: string;
  version: number;
  metaConfig?: MetaConfig;
  fields: FieldMetadata[];
}
