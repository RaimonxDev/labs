import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface StoreState {
    key: string;
    state: any;
}

export type Store = Map<string, any>;


@Injectable({ providedIn: 'root' })
export class StateService {

  store: Store = new Map<string, any>();
  _store$ = new BehaviorSubject<any>(null);

  constructor() { }


  initialState(store: Store) {
    this.store = store;
  }

  createState<T>(store: T[]) {
    store.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (this.checkStateIfExist(key)) {
          console.error(`State ${key} already exist`);
          return;
        }
        this.store.set(key, new BehaviorSubject(item[key]))
      })
    })
    this.updateStore();
  }

  getState<T>(key: keyof T): Observable<any> {
    return this.store.get(key as string);
  }

  setState<T>(key: keyof T, value: any) {
    if (!this.checkStateIfExist(key as string)) {
      console.error(`State ${key as string} not exist`);
      return;
    }
    this.store.get(key as string).next({
      ...this.getValuetFromStore(key as string), // get current value
      ...value
    });
    this.updateStore();
  }

  checkStateIfExist(key: string) {
    return this.store.has(key);
  }

  resetState<T>(key: keyof T) {
    if (!this.checkStateIfExist(key as string)) {
      console.error(`State ${key as string} not exist`);
      return;
    }
    const allKeys: any[] = Object.keys(this.getValuetFromStore(key as string));

    this.store.get(key as string).next({
      ...allKeys.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {})
    })
    this.updateStore();
  }

  resetAllState() {
    this.store.forEach((value) => {
      value.next(null);
    })
    this.updateStore();
  }

  getAllStateSnapshopt() {
    const _storeObject: any = {}
    this.store.forEach((value, key) => {
      _storeObject[key] = value.getValue();
    })
    return _storeObject;
  }

  // Return all state as object with key and getValue() from behaviorSubject
  getAllState$(): Observable<unknown> {
    return this._store$.asObservable();
  }

  private updateStore = () => {
    this._store$.next(this.getAllStateSnapshopt());
  }
  private getValuetFromStore(key: string) {
    return this.store.get(key).getValue();
  }




}
