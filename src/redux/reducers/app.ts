import { AnyAction } from 'redux';
import { RESET_STATE, SET_IN_STATE } from '../actions/app';

interface ReducerState {
    expiration?: number;
    created?: number;
    reference?: string;
    secret?: string;
    selectedBalance?: Dashboard.Balance;
    language: 'en' | 'ko';
}

const initialState: ReducerState = {
    expiration: undefined,
    created: undefined,
    reference: undefined,
    secret: undefined,
    selectedBalance: undefined,
    language: 'en',
};

const reducer = (state: ReducerState = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_IN_STATE:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return { ...initialState, language: state.language };
        default: {
            return state;
        }
    }
};

export default reducer;
