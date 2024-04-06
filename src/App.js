import React, {useEffect} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Pages/Home';
import DisplayVideo from './Pages/DisplayVideo';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/Account';
import ReduxProvider from './Components/ReduxProvider';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';

function App() {
    const dispatch = useDispatch();

    const onAuthStateChanged = (user) => {
        if(!user) {
            if(Actions.currentScene === 'account')
                Actions.login();
            console.log('logged out');
            dispatch({type: 'UPDATE_USER', user: null});
            return; 
        }
        console.log('logged in')
        let userData = {
            userName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            userImage: user.photoURL,
            uid: user.uid,
        }
        console.log(user.displayName);
        dispatch({type: 'UPDATE_USER', user: userData});
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
