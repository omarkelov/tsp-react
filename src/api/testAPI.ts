import { CONTEXT_ADDRESS, DICTIONARIES_ADDRESS, PHRASES_ADDRESS } from './constants';


export const fetchGetTest = (dictionaryName: string, signal: AbortSignal) =>
    fetch(`${DICTIONARIES_ADDRESS}/${dictionaryName}/test`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchGetContext = (phraseId: number, signal: AbortSignal) =>
    fetch(`${CONTEXT_ADDRESS}?phraseId=${phraseId}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchPatchPhrase = (phraseId: number, isCorrect: boolean, signal: AbortSignal) =>
    fetch(`${PHRASES_ADDRESS}/${phraseId}?correct=${isCorrect}`, {
        credentials: 'include',
        method: 'PATCH',
        signal,
    });
