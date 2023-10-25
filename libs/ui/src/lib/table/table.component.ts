import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableConfig } from './table.model';
export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  weight: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

const configTable: TableConfig[] = [
  {
    columnDef: 'name',
    header: 'Name',
    type: 'text',
    isSortable: true,
    isFilterable: true,
    isEditable: true,
    isHidden: false,
    isDisabled: false,
    cell: (element: PeriodicElement) => `${element.position}`,
  },
  {
    columnDef: 'id',
    header: 'No.',
    type: 'number',
    isSortable: true,
    isFilterable: true,
    isEditable: true,
    isHidden: false,
    isDisabled: false,
    cell: (element: PeriodicElement) => `${element.position}`,
  },
  {
    columnDef: 'fecha',
    header: 'Fecha de Inicio',
    type: 'date',
    formatDate: 'shortDate',
    isSortable: true,
    isFilterable: true,
    isEditable: true,
    isHidden: false,
    isDisabled: false,
    cell: (element: PeriodicElement) => `${element.position}`,
  }
]

const dataExample =
  [
    { id: 1, name: 'Ramon', fecha: new Date() },
    { id: 2, name: 'Meilyn', fecha: new Date() },
    { id: 3, name: 'Rodrigo', fecha: new Date() },
  ]


@Component({
  selector: 'rx-labs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  dataSource = new ExampleDataSource();
  configTableExample = configTable;
  displayedColumns = this.configTableExample.map((c) => c.columnDef);
  actionsExample = ['edit', 'delete'];
  allColumns: string[] = [];

  @Output() actionClicked: EventEmitter<{ action: string, row: any }> = new EventEmitter();

  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  @Output() rowsSelecteds = new EventEmitter<any[]>();

  /**
   * @description Define si la tabla permite seleccionar multiples filas
   */
  _isMultipleSelection = false;
  @Input()
  set isMultipleSelection(value: boolean) {
    this._isMultipleSelection = value;
  }
  get isMultipleSelection(): boolean { return this._isMultipleSelection; }

  _selections = new SelectionModel<any>(this.isMultipleSelection, []);

  data = dataExample;

  ngOnInit(): void {
    this.allColumns = this.concatColumns();
  }

  concatColumns() {
    let _columns: string[] = []
    if (this.configTableExample.find(c => c.type === 'actions')) {
      _columns = [...this.actionsExample]
    }
    if (this.configTableExample.find(c => c.type === 'checkbox')) {
      _columns = [..._columns, 'radio']

      if (this.isMultipleSelection) {
        _columns = [..._columns, 'select']
      }
    }
    return [...this.displayedColumns, ..._columns]
  }

  handleActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  selectRow(row: any) {
    this.rowSelected.emit(row);
  }


}

export class ExampleDataSource extends DataSource<any> {
  /** Stream of data that is provided to the table. */
  // data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);
  data = new BehaviorSubject<any[]>(dataExample);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.data;
  }

  disconnect() { }
}
