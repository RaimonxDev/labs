import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableConfig } from './table.model';

const configTable: TableConfig[] = [
  {
    columnDef: 'id',
    header: 'id atencion',
    type: 'number',
    width: '0 0 200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'name',
    header: 'Name',
    type: 'text',
    width: '0 0 200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'fecha',
    header: 'Fecha de Inicio',
    type: 'date',
    formatDate: 'shortDate',
    width: '0 0 200px',
    cell: (element: any) => console.log(element, 'element'),
  },
  {
    columnDef: 'id2',
    header: 'id atencion',
    type: 'number',
    width: '0 0 200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'name2',
    header: 'Name',
    type: 'text',
    width: '0 0 200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'fecha2',
    header: 'Fecha de Inicio',
    type: 'date',
    formatDate: 'shortDate',
    width: '0 0 200px',
    cell: (element: any) => console.log(element, 'element'),
  }
]

const dataExample =
  [
    { id: 1, name: 'Ramon', fecha: new Date() },
    { id: 2, name: 'Meilyn', fecha: new Date() },
    { id: 3, name: 'Rodrigo', fecha: new Date() },
    { id: 2, name: 'Meilyn', fecha: new Date() },
    { id: 3, name: 'Rodrigo', fecha: new Date() },
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
    if (this.actionsExample.length > 0) {
      _columns = [..._columns, 'actions']
    }
    if (this.configTableExample.find(c => c.type === 'checkbox')) {
      _columns = [..._columns, 'radio']

      if (this.isMultipleSelection) {
        _columns = [..._columns, 'select']
      }
    }
    console.log(_columns, 'columns')
    return [..._columns, ...this.displayedColumns,]
  }

  handleActionClick(action: string, row: any) {
    console.log(action, row, 'action')
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
