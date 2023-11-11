import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, map, filter, scan, tap } from 'rxjs/operators';
import { SpeechRecognitionInfo, Transcript } from './speechR.interface';
import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

export class SpeechRecognitionService {
  private recognition: any;
  private stopListening = new Subject<void>();
  private transcriptSubject = new Subject<string>();
  private listening = false;

  constructor() {
    this.recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';
  }

  public startRecognition() {
    if (this.listening) return;
    this.listening = true;

    this.recognition.start();
    this.createRecognitionSubscription(this.recognition);
  }

  public stopRecognition() {
    this.stopListening.next();
    this.recognition.stop();
    this.listening = false;
  }

  public getTranscriptObservable(): Observable<string> {
    return this.transcriptSubject.asObservable();
  }

  private createRecognitionSubscription(recognition: any) {
    fromEvent(recognition, 'end')
      .pipe(takeUntil(this.stopListening))
      .subscribe(() => recognition.start());

    return this.createWordListObservable(recognition)
      .pipe(takeUntil(this.stopListening))
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.isFinal) {
            this.transcriptSubject.next(data.transcript);
          }
          // Aquí puedes procesar los datos recibidos
        },
        complete: () => console.log('Reconocimiento detenido'),
      });
  }

  private createWordListObservable(recognition: any) {
    return fromEvent(recognition, 'result').pipe(
      map((e: any): SpeechRecognitionInfo => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0].transcript)
          .join('');
        const firstResult = e.results[0];
        return {
          transcript,
          isFinal: firstResult.isFinal,
        };
      }),
      tap((data) => console.log(data)),
      filter(({ isFinal }) => isFinal)
    );
  }
}
