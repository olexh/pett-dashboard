import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { app } from './reducers';
import { useDispatch } from 'react-redux';

const persistConfig = {
    key: 'root',
    whitelist: ['app'],
    storage,
    stateReconciler: autoMergeLevel2,
};

const reducer = combineReducers({
    app,
});

const persistedReducer = persistReducer<ReturnType<typeof reducer>>(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch & ThunkDispatch<RootState, null, AnyAction>>();

export default store;
