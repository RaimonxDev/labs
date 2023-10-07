import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StoreState {
    key: string;
    state: any;
}

export type Store = Map<string, any>;

const store = {
    step1: new BehaviorSubject<any>({
        data: null,
        otherField: null
    }),
    step2: new BehaviorSubject<any>({
        data: null,
        user: null
    })
}

@Injectable({ providedIn: 'root' })
export class StateService {
    constructor() { }


    initialState() {

    }



}
