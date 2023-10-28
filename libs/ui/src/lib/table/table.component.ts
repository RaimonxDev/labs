import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableConfig } from './table.model';

const configTable: TableConfig[] = [
  {
    columnDef: 'id',
    header: 'id atencion',
    type: 'number',
    width: '100px',
    sticky: false,
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
    sticky: false,
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
  displayedColumns: { columnDef: string, header: string }[] = [];
  /**
   * @description Lista de columnas que se pueden mostrar o ocultar
  */
  columnsToDisplay: { columnDef: string, header: string }[] = [];

  columnConfig: TableConfig[] = []
  actionsExample = ['edit', 'delete'];
  private _hasActions = false;
  private _hasCheckbox = false;
  // Obtendra todas las columnas que se mostraran en la tabla
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

  _selectionsColumnsDisplayed = new SelectionModel<any>(true, []);

  /**
   * @description Define si los botones de acciones se ocultan cuando no se selecciona una fila
   */
  hideActionsOfUnselectedElement = false;

  data = dataExample;

  ngOnInit(): void {
    this.allColumns = this.prepareColumns();
    this.getOptionsDisplayColumns();

    this.columnConfig = this.displayedColumns.map((c) => {
      return this.configTableExample.find((col) => col.columnDef === c.columnDef);
    }).filter((c) => c) as TableConfig[];

    // agregar en configTableExample la propiedad isHidden para ocultar columnas segund lo que el usuario seleccione
    this._selectionsColumnsDisplayed.changed.subscribe((value) => {
      let cols: string[] = []
      if (this._hasActions) {
        cols = [...cols, 'actions'];
      }
      if (this._hasCheckbox) {
        cols = [...cols, 'checkbox'];
      }
      this.allColumns = [...cols, ...this.filteringDisplayedColumns(value.source.selected)];

    });
  }

  prepareColumns() {
    this.displayedColumns = this.configTableExample.map((c) => {
      return { header: c.header, columnDef: c.columnDef }
    });

    if (this.enableCheckBox) {
      this._hasCheckbox = true;
      this.displayedColumns = [{ header: 'Seleccionar', columnDef: 'checkbox' }, ...this.displayedColumns]
    }

    if (this.actionsExample.length > 0) {
      this._hasActions = true;
      this.displayedColumns = [{ header: 'Acciones', columnDef: 'actions' }, ...this.displayedColumns]
    }
    const columns = this.displayedColumns.map((c) => c.columnDef);

    // retorna un array con los nombres de las columnas
    return columns;
  }

  getOptionsDisplayColumns() {
    this.columnsToDisplay =
      [...this.displayedColumns].filter((c) => c.columnDef !== 'actions' && c.columnDef !== 'checkbox');
    this._selectionsColumnsDisplayed.select(...this.columnsToDisplay.map((c) => c.columnDef), { emitEvent: false });
  }


  handleActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  handleShowColumnClick(column: string) {
    this._selectionsColumnsDisplayed.toggle(column);
  }

  /**
   * @description Filtra las columnas que se mostraran en la tabla
   * @param columns
  */
  filteringDisplayedColumns(columns: string[]) {
    return this.configTableExample.filter((c) => columns.includes(c.columnDef)).map((c) => c.columnDef);
  }

  /**
   * @description Seleciona una fila de la table y emite el evento rowSelected
   * @param row
   */
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
