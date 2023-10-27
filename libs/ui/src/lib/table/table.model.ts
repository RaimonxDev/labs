export interface TableConfig {
  columnDef: string;
  header: string;
  cell?: (element: any) => any;
  type: ColumnType;
  currencyCode?: string;
  formatDate?: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  isEditable?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
  width?: string
}

type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'boolean' | 'actions' | 'checkbox' | 'templateRef' | 'radio';

export interface Actions {
  text: string;
  icon: string;
  color: string;
  tooltip: string;
  isDisable: (element: any) => boolean;
}
