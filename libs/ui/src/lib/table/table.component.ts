import {
  SelectionModel
} from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TableConfig } from './table.model';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'rx-labs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  _configTable: TableConfig[] = [];
  @Input()
  set configTable(value: TableConfig[]) {
    if (!value) {
      throw new Error('configTable is required');
    }
    this._configTable = value;
  }
  get configTable(): TableConfig[] { return this._configTable; }


  protected _dataSource!: MatTableDataSource<any>
  @Input()
  set dataTable(value: any[]) { this._dataSource = new MatTableDataSource(value); }
  get dataTableValue(): any[] { return this._dataSource.data; }

  _actions: string[] = [];
  @Input()
  set actions(value: string[]) { this.actions = value; }
  get actions(): string[] { return this._actions; }

  _enableCheckBox = false;
  @Input()
  set enableCheckBox(value: boolean) { this._enableCheckBox = value; }
  get enableCheckBox(): boolean { return this._enableCheckBox; }

  /**
  * @description Define si la tabla permite seleccionar multiples filas
  */
  _isMultipleSelection = true;
  @Input()
  set isMultipleSelection(value: boolean) { this._isMultipleSelection = value; }
  get isMultipleSelection(): boolean { return this._isMultipleSelection; }

  /**
   * @description Define si los botones de acciones se ocultan cuando no se selecciona una fila
   */
  _hideActionsOfUnselectedElement = false;
  @Input()
  set hideActionsOfUnselectedElement(value: boolean) { this._hideActionsOfUnselectedElement = value; }
  get hideActionsOfUnselectedElement(): boolean { return this._hideActionsOfUnselectedElement; }


  displayedColumns: { columnDef: string, header: string }[] = [];
  /**
   * @description Lista de columnas que se pueden mostrar o ocultar se mostrara en el select de las columnas
   * @member columnsToDisplay
  */
  columnsToDisplay: { columnDef: string, header: string }[] = [];

  /**
   * @description Configuracion de las columnas que se mostraran en la tabla
   * @member columnConfig
  */
  columnConfig: TableConfig[] = []

  // Obtendra todas las columnas que se mostraran en la tabla
  allColumns: string[] = [];

  @Output()
  actionClicked: EventEmitter<{ action: string, row: any }> = new EventEmitter();

  @Output()
  rowSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  rowsSelecteds = new EventEmitter<any[]>();

  /**
   * @Members Helpers
   */
  private _hasActions = false;
  private _hasCheckbox = false;

  /**
   * @Members Selections
   */
  _selections = new SelectionModel<any>(this.isMultipleSelection, []);
  _selectionsColumnsDisplayed = new SelectionModel<any>(true, []);

  inputSearch = new FormControl('');

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.allColumns = this.prepareColumns();
    this.getOptionsDisplayColumns();

    this.columnConfig = this.displayedColumns.map((c) => {
      return this._configTable.find((col) => col.columnDef === c.columnDef);
    }).filter((c) => c) as TableConfig[];


    this._selectionsColumnsDisplayed.changed.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      let cols: string[] = []
      if (this._hasActions) {
        cols = [...cols, 'actions'];
      }
      if (this._hasCheckbox) {
        cols = [...cols, 'checkbox'];
      }
      this.allColumns = [...cols, ...this.filteringDisplayedColumns(value.source.selected)];
    });

    this.inputSearch.valueChanges.pipe(
      takeUntil(this.destroy$)).subscribe((value) => {
        this._dataSource.filter = (value as string).trim().toLowerCase();
      });

  }

  ngAfterViewInit() {
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  prepareColumns() {
    this.displayedColumns = this._configTable.map((c) => {
      return { header: c.header, columnDef: c.columnDef }
    });

    if (this._enableCheckBox) {
      this._hasCheckbox = true;
      this.displayedColumns = [{ header: 'Seleccionar', columnDef: 'checkbox' }, ...this.displayedColumns]
    }

    if (this.actions.length > 0) {
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
    return this._configTable.filter((c) => columns.includes(c.columnDef)).map((c) => c.columnDef);
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

