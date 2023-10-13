export interface Dictionary {
    name: string;
    lang: string;
}

export interface Movie {
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
