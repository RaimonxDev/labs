export interface TableConfig<T = unknown> {
  columnDef: keyof T | string;
  header: string;
  cell?: (element: T) => any;
  type?: ColumnType; // Deberia de ser opcional y si no se envia que sea text
  currencyCode?: string;
  formatDate?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  width?: {
    min?: number;
    max?: number;
  };
  sticky?: boolean;
  classCell?: any;
  conditionClass?: (element: T) => any; // Funcion que retorna la clase que se le va a aplicar a la celda
}

type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'boolean' | 'actions' | 'checkbox' | 'templateRef' | 'radio';

export interface Actions {
  text: string;
  icon: string;
  color: string;
  tooltip: string;
  isDisable: (element: any) => boolean;
}
