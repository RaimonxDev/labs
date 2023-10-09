import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../../../../../libs/state/src';

export interface StoreExample {
  step1: Step1,
  step2: Step2,
  user?: User
}

export interface Step1 {
  data: any;
  otherField: any;
}
export interface Step2 {
  data: any;
  user: any;
  filters: {
    name: string;
    age: number;
  }
}

const dataExample: StoreExample = {
  step1: {
    data: [
      {
        id: 1,
        name: 'test'
      }
    ],
    otherField: 'cualquier otro valor'
  },
  step2: {
    data: null,
    user: null,
    filters: {
      name: 'ramon',
      age: 25
    }
  },
  user: {
    name: 'ramon',
    age: 25
  }
}

export interface User {
  name: string;
  age: number;
}
@Component({
  selector: 'example',
  standalone: true,
  imports: [
    MatButtonModule

  ],
  templateUrl: './example.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {

  stateService: StateService<StoreExample> = inject(StateService);

  constructor() { }

  ngOnInit(): void {
    this.stateService.createState(dataExample);

    this.stateService.onState('user').subscribe((data) => {
      console.log('user', data);
    })

    this.stateService.getSnapshot('step1')

    // this.stateService.getState('step2').subscribe((data) => {
    //   console.log(data);
    // })

    // this.stateService.getAllState$().subscribe((data: StoreExample) => {
    //   console.log('getAllState$', data);
    // })
  }


  changeState() {
    this.stateService.setState('user', {
      name: 'pepe',
      age: 25
    })
  }

  resetState() {
    // this.stateService.resetState('step2');
  }
  resetAllState() {
    this.stateService.resetAllState();
  }

}
