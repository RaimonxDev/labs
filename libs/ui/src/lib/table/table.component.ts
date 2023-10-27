import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableConfig } from './table.model';

const configTable: TableConfig[] = [
  {
    columnDef: 'id',
    header: 'id atencion',
    type: 'number',
    width: '200px',
    sticky: true,
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'name',
    header: 'Name',
    type: 'text',
    width: '100px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'fecha',
    header: 'Fecha de Inicio',
    type: 'date',
    formatDate: 'shortDate',
    width: '150px',
    sticky: true,
    cell: (element: any) => console.log(element, 'element'),
  },
  {
    columnDef: 'paciente',
    header: 'Paciente',
    type: 'number',
    width: '200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'apePaciente',
    header: 'Apellido Paciente',
    type: 'text',
    width: '200px',
    cell: (element: any) => `${element.header}`,
  },
  {
    columnDef: 'edad',
    header: 'Fecha de Inicio',
    type: 'date',
    formatDate: 'shortDate',
    width: '200px',
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

  enableCheckBox = true;

  dataSource = new ExampleDataSource();
  configTableExample = configTable;
  displayedColumns = this.configTableExample.map((c) => c.columnDef);
  displayedColumnsHeader = this.configTableExample.map((c) => {
    return { header: c.header, columnDef: c.columnDef }
  });
  actionsExample = ['edit', 'delete'];
  allColumns: string[] = [];

  @Output() actionClicked: EventEmitter<{ action: string, row: any }> = new EventEmitter();

  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  @Output() rowsSelecteds = new EventEmitter<any[]>();

  /**
   * @description Define si la tabla permite seleccionar multiples filas
   */
  _isMultipleSelection = true;
  @Input()
  set isMultipleSelection(value: boolean) {
    this._isMultipleSelection = value;
  }
  get isMultipleSelection(): boolean { return this._isMultipleSelection; }

  _selections = new SelectionModel<any>(this.isMultipleSelection, []);

  _selectionsColumnsDisplayed = new SelectionModel<any>(true, this.displayedColumnsHeader.map((c) => c.columnDef));

  /**
   * @description Define si los botones de acciones se ocultan cuando no se selecciona una fila
   */
  hideActionsOfUnselectedElement = false;

  data = dataExample;

  ngOnInit(): void {
    this.allColumns = this.concatColumns();


    // agregar en configTableExample la propiedad isHidden para ocultar columnas segund lo que el usuario seleccione
    this._selectionsColumnsDisplayed.changed.subscribe((value) => {
      this.configTableExample = this.configTableExample.map((column) => {
        if (value.added.includes(column.columnDef)) {
          return { ...column, isHidden: false }
        }
        if (value.removed.includes(column.columnDef)) {
          return { ...column, isHidden: true }
        }
        return column
      });


    });
  }

  concatColumns() {
    let _columns: string[] = []
    if (this.actionsExample.length > 0) {
      _columns = [..._columns, 'actions']
    }
    if (this.enableCheckBox) {
      _columns = [..._columns, 'checkbox']

      // if (this.isMultipleSelection) {
      //   _columns = [..._columns, 'select']
      // }
    }
    return [..._columns, ...this.displayedColumns,]
  }

  handleActionClick(action: string, row: any) {
    console.log(action, row, 'action')
    this.actionClicked.emit({ action, row });
  }

  handleShowColumnClick(column: string) {
    this._selectionsColumnsDisplayed.toggle(column);
    console.log(this._selectionsColumnsDisplayed.selected, 'this._selectionsColumnsDisplayed.selected')
    console.log(column, 'column')
  }

  selectRow(row: any) {
    if (this.isMultipleSelection) {
      this._selections.toggle(row);
    }
    if (!this.isMultipleSelection) {
      if (this._selections.hasValue() && this._selections.selected[0] === row) {
        this._selections.clear();
      }
      else {
        this._selections.toggle(row);
      }
    }
    this.rowsSelecteds.emit(this._selections.selected);
    console.log(this._selections.selected, 'this._selections.selected');
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
