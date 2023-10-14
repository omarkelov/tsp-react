import { createSlice } from '@reduxjs/toolkit';

import { SERVER_ADDRESS } from '../../api/constants';
import { RootState } from '../store';


export const PLAYER_REDUCER_KEY = 'player';

export interface PlayerState {
    link: string | undefined;
}

const initialState: PlayerState = {
    link: undefined,
};

export const playerSlice = createSlice({
    name: PLAYER_REDUCER_KEY,
    initialState,
    reducers: {
        openPlayer: (state, { payload: link }: { payload: string }) => {
            state.link = `${SERVER_ADDRESS}${link}`;
        },
        closePlayer: _ => initialState, // eslint-disable-line @typescript-eslint/no-unused-vars
    },
});

export const { openPlayer, closePlayer } = playerSlice.actions;

export const selectLink = (state: RootState) => state[PLAYER_REDUCER_KEY].link;

export default playerSlice.reducer;
