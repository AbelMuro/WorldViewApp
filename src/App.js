import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Pages/Home';
import DisplayVideo from './Pages/DisplayVideo'

function App() {
  return (
      
            <Router>  
                <Scene key='root'>    
                    <Scene key='home' component={Home} initial hideNavBar/>    
                    <Scene key='video' component={DisplayVideo} hideNavBar/>                         
                </Scene> 
            </Router>      
  )
}

export default App;
