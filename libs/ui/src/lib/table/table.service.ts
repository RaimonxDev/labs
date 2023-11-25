import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableService<T> {
  constructor() { }

  private _dataTable = new BehaviorSubject<Array<T>>([]);

  setDataTable(data: Array<T>) {
    this._dataTable.next(data);
  }

  getDataTable() {
    return this._dataTable.asObservable();
  }

  /**
   * @description Obtiene el valor de la celda
   * @param element
   * @param columnDef
   * @returns
   */
  getCellValue<K extends keyof T>(element: T, columnDef: K) {
    return element[columnDef];
  }

  findRow(filterFn: (element: T) => boolean): { index: number, element: T | undefined } {
    const dataArray = this._dataTable.getValue();
    const index = dataArray.findIndex(filterFn);
    const element = dataArray[index] || undefined;
    return { index, element };
  }

  /**
   * @description Actualizar una fila de la tabla
   * @param index
   * @param element
   */
  updateRow({ index, element }: { index: number, element: T }) {
    this._dataTable.getValue()[index] = element;
    this._dataTable.next(this._dataTable.getValue());
  }

  /**
   * @description Actualizar varias filas de la tabla. Para un mejor rendimiento se recomienda usar este metodo en vez de updateRow
   * @param data
   * @returns
   * @example
   * this.tableService.updateRows([
   * { index: 0, element: { id: 1, name: 'name 1' } },
   * { index: 1, element: { id: 2, name: 'name 2' } }]);
   */
  updateRows(data: { index: number, element: T }[]) {
    const dataValue = this._dataTable.getValue();

    data.forEach(({ index, element }) => {
      dataValue[index] = element;
    });

    this._dataTable.next(dataValue);
  }



}
