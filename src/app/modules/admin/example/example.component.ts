import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { StateService } from '../../../../../libs/state/src';
import { user } from 'app/mock-api/common/user/data';
import { MatButtonModule } from '@angular/material/button';

export interface StoreExample {
  step1: {
    data: any;
    otherField: any;
  },
  step2: {
    data: any;
    user: any;
    filters: {
      name: string;
      age: number;
    }
  }
}

const storeExample: StoreExample[] = [{
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
  }
}]
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

  stateService = inject(StateService);
  constructor() { }

  ngOnInit(): void {
    this.stateService.createState(storeExample);

    this.stateService.getState<StoreExample>('step2').subscribe((data) => {
      console.log(data);
    })

    this.stateService.getAllState$().subscribe((data: StoreExample) => {
      console.log('getAllState$', data);
    })


  }

  changeState() {
    this.stateService.setState<StoreExample>('step2', {
      data: [1, 2, 3, 4, 5],
      user: {
        id: 1,
        name: 'ramon'
      },
    })
  }

  resetState() {
    this.stateService.resetState<StoreExample>('step2');
  }
  resetAllState() {
    this.stateService.resetAllState();
  }

}
