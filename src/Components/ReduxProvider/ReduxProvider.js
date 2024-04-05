import React from 'react';
import { Provider } from 'react-redux';
import store from '~/Store';

function ReduxProvider(App) {
    return () => 
        (
            <Provider store={store}>
                <App/>
            </Provider>            
        )
    
}

export default ReduxProvider;