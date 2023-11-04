export interface TableConfig {
  columnDef: string;
  header: string;
  cell?: (element: any) => any;
  type: ColumnType;
  currencyCode?: string;
  formatDate?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  width?: {
    min?: number;
    max?: number;
  };
  sticky?: boolean;
}

type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'boolean' | 'actions' | 'checkbox' | 'templateRef' | 'radio';

export interface Actions {
  text: string;
  icon: string;
  color: string;
  tooltip: string;
  isDisable: (element: any) => boolean;
}
