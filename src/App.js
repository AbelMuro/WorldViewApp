import React, {useEffect} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Pages/Home';
import DisplayVideo from './Pages/DisplayVideo';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/Account';
import ReduxProvider from './Components/ReduxProvider';
import auth from '@react-native-firebase/auth';
import {Actions} from 'react-native-router-flux';

function App() {

    const onAuthStateChanged = (user) => {
        if(!user) {
            if(Actions.currentScene === 'account')
                Actions.login();
            console.log('logged out');
            return; 
        }
        else{
            console.log('logged in');
        } 
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    return (
        <Router>  
            <Scene key='root'>    
                <Scene key='home' component={Home} initial hideNavBar/>    
                <Scene key='video' component={DisplayVideo} hideNavBar/>       
                <Scene key='login' component={Login} hideNavBar/>     
                <Scene key='register' component={Register} hideNavBar/>       
                <Scene key='account' component={Account} hideNavBar/>         
            </Scene> 
        </Router>              
    )
}

export default ReduxProvider(App);
