export interface TableConfig {
  columnDef: string;
  header: string;
  cell?: (element: any) => string;
  type: ColumnType;
  currencyCode?: string;
  formatDate?: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  isEditable?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
}

type ColumnType = 'text' | 'number' | 'currency' | 'date'
