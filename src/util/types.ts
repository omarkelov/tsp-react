export type Dictionary = {
    name: string;
    lang: string;
}

export type PhraseStats = {
    successfulAttempts: number;
    attempts: number;
}

export type Phrase = {
    id: number;
    phrase: string;
    translation: string;
    correctedPhrase?: string;
    phraseStats?: PhraseStats;
}

export type Context = {
    id: number;
    context: string;
    link?: string;
    phrases?: Phrase[];
}

export type Test = {
    name: string;
    phrasesIds: number[];
}

export type Movie = {
    id: number;
    videoFilePath: string;
}

export type Entity = Dictionary | Movie;
export type EntityKey = Dictionary['name'] | Movie['id'];

export type LoadingStatus = 'idle' | 'loading' | 'failed';
export type DeletionStatus = 'deleting' | 'deleted';

export interface ResponseError {
    code: number;
}
