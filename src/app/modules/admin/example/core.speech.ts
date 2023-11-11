import { fromEvent, tap, map, filter, scan, takeUntil } from 'rxjs';
import { SpeechRecognitionInfo, Transcript } from './speechR.interface';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

export const createRecognition = () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'es-ES';

  return recognition;
};

export const createRecognitionSubscription = (recognition: any) =>
  fromEvent(recognition, 'end')
    .pipe(
      tap(() => recognition.start()))
    .subscribe();


// export const stopRecognition = (recognition: any) => {
//   recognition.stop();
//   recognition.abort();
//   recognition.onend = () => {
//     console.log('recognition.onend');
//   };
// }

export const createWordListObservable = (recognition: any) => {
  return fromEvent(recognition, 'result').pipe(
    map((e: any): SpeechRecognitionInfo => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0].transcript)
        .join('');

      const firstResult = e.results[0];
      console.log('firstResult', firstResult)
      return {
        transcript,
        isFinal: firstResult.isFinal,
      };
    }),
    filter(({ isFinal }) => isFinal),
    scan(
      (acc: Transcript[], { transcript }) =>
        acc.concat({
          transcript,
        }),
      [],
    ),
  );
};
