import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './i18n/i18n';
import store, { persistor } from './redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'swiper/css/bundle';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.baseURL = 'https://api.pett.co.in/v1';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <React.Suspense fallback="Loading...">
                        <App />
                    </React.Suspense>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
