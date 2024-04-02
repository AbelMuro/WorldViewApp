import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from './Store';
import Home from './Pages/Home';
import DisplayVideo from './Pages/DisplayVideo'

function App() {
  return (
        <Provider store={store}>
            <Router>  
                <Scene key='root'>    
                    <Scene key='home' component={Home} initial hideNavBar/>    
                    <Scene key='video' component={DisplayVideo} hideNavBar/>                         
                </Scene> 
            </Router>              
        </Provider>
          
    
  )
}

export default App;
