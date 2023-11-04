import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableService {
  constructor() { }

  private _dataTable = new BehaviorSubject<any>(undefined);

  setDataTable(data: any) {
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
  getCellValue(element: any, columnDef: string): any {
    return element[columnDef];
  }

  findRow(filterFn: (element: any) => any): { index: number, element: any } {
    const index = this._dataTable.getValue().findIndex((e: any) => filterFn(e))

    return {
      index,
      element: this._dataTable.getValue()[index]
    }
  }

  updateRow({ index, element }: { index: number, element: any }) {
    this._dataTable.getValue()[index] = element;
    this._dataTable.next(this._dataTable.getValue());
  }

}
