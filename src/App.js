import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { SafeAreaView, ScrollView} from 'react-native';
import HeaderBar from './Components/HeaderBar';
import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';

function App() {
  return (
        <>
            <Router>  
                <Scene key='root'>        
                  <Scene key='home' component={Home} initial hideNavBar/>            
                </Scene> 
            </Router>      
        </>
  )
}

export default App;
