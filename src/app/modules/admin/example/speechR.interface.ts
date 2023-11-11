export interface SpeechRecognitionInfo {
  transcript: string;
  isFinal: boolean;
}

export type Transcript = Omit<SpeechRecognitionInfo, 'isFinal'>
