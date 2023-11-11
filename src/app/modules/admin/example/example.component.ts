import { Component, OnInit, ViewEncapsulation, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../../../../../libs/state/src';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { createRecognition, createRecognitionSubscription, createWordListObservable } from './core.speech';
import { SpeechRecognitionService } from './speech.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatButtonModule,
    FormsModule,
    AsyncPipe,
    NgFor,
    NgIf,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './example.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `.words {
        max-width: 500px;
        margin: 50px auto;
        background: white;
        border-radius: 5px;
        box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
        padding: 1rem 2rem 1rem 5rem;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
        background-size: 100% 3rem;
        position: relative;
        line-height: 3rem;
      }

      p {
        margin: 0 0 3rem;
      }

      .words:before {
        content: '';
        position: absolute;
        width: 4px;
        top: 0;
        left: 30px;
        bottom: 0;
        border: 1px solid;
        border-color: transparent #efe4e4;
      }`
  ]
})
export class ExampleComponent implements OnInit, OnDestroy {
  options: any
  text: any
  paused: any
  transcript: any

  recognition = createRecognition();
  subscription;
  wordList$ = createWordListObservable(this.recognition);


  stateService: StateService<StoreExample> = inject(StateService);

  constructor(private speechService: SpeechRecognitionService) { }

  ngOnInit(): void {
    this.stateService.createState(dataExample);
    // this.recognition.start();

    this.stateService.onState('user').subscribe((data) => {
      console.log('user', data);
    })

    this.wordList$.subscribe((data) => {
      console.log('data', data);
    })
    this.stateService.getSnapshot('step1')

    this.speechService.getTranscriptObservable().subscribe((data) => {
      console.log('data', data);
      this.transcript += data;
    }
    )

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

  startRecognition() {
    this.speechService.startRecognition();
  }

  stopRecognition() {
    this.speechService.stopRecognition();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
