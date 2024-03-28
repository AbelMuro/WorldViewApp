import React from 'react';
import { SafeAreaView} from 'react-native';
import HeaderBar from './Components/HeaderBar';
import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';

function App() {
  return (
    <SafeAreaView>
        <HeaderBar/>     
        <MenuBar/> 
        <Home/>        
    </SafeAreaView>
  )
}

export default App;
