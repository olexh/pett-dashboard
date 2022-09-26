export const SET_IN_STATE = 'app/SET_IN_STATE';
export const RESET_STATE = 'app/RESET_STATE';

export const setInState = (payload: Record<string, any>) => ({
    type: SET_IN_STATE,
    payload,
});

export const resetState = () => ({
    type: RESET_STATE,
});
