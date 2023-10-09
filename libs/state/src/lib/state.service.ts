import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Store<T> = Map<keyof T, BehaviorSubject<T[keyof T]>>;
@Injectable({ providedIn: 'root' })
export class StateService<T> {

  private store: Store<T> = new Map<keyof T, BehaviorSubject<T[keyof T]>>();
  private _store$ = new BehaviorSubject<any>(null);
  private initialState: Partial<T> = {};

  constructor() { }

  createState(initialState: Partial<T>) {
    this.initialState = { ...initialState };
    Object.keys(initialState).forEach((key) => {
      const stateKey = key as keyof T;
      if (this.checkStateIfExist(stateKey)) {
        console.error(`State ${stateKey as string} already exist`);
        return;
      }
      this.store.set(stateKey, new BehaviorSubject(initialState[stateKey] as T[keyof T]));
    });
    this.emitStore();
  }

  onState<K extends keyof T>(key: K): Observable<T[K] | null> {
    if (!this.checkStateIfExist(key)) {
      console.error(`State ${key as string} not exist`);
      return of(null);
    }
    return this.store.get(key)?.asObservable() as Observable<T[K]>
  }

  onAllState$(): Observable<Partial<T>> {
    return this._store$.asObservable();
  }

  setState(key: keyof T, value: T[keyof T]) {
    if (!this.checkStateIfExist(key)) {
      console.error(`State ${key as string} not exist`);
      return;
    }
    this.store.get(key)?.next({
      ...this.store.get(key)?.getValue(),
      ...value
    });
    this.emitStore();
  }

  resetState(key: keyof T) {
    if (!this.checkStateIfExist(key)) {
      console.error(`State ${key as string} not exist`);
      return;
    }
    const initialValue = this.initialState[key];
    this.store.get(key)?.next(initialValue as T[keyof T]);
    this.emitStore();
  }

  resetAllState() {
    this.store.forEach((_, key) => {
      const initialValue = this.initialState[key];
      this.store.get(key)?.next(initialValue as T[keyof T]);
    });
    this.emitStore();
  }

  getSnapshot(key: keyof T): any {
    return this.store.get(key)?.getValue();
  }

  getAllStateSnapshot(): Partial<T> {
    const _storeObject: Partial<T> = {};
    this.store.forEach((value, key) => {
      _storeObject[key] = value.getValue();
    });
    return _storeObject;
  }

  private checkStateIfExist(key: keyof T) {
    return this.store.has(key);
  }

  private emitStore = () => {
    this._store$.next(this.getAllStateSnapshot());
  }

}
