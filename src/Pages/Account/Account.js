import React from 'react';
import {SafeAreaView, ScrollView, Dimensions} from 'react-native';
import UserInfo from './UserInfo';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar'; 
import UserVideos from './UserVideos';
import {Actions} from 'react-native-route-flux';

//this is where i left off
function Account() { 

    return(
        <SafeAreaView>
            <HeaderBar back={true}/>
            <MenuBar/>
            <ScrollView style={{maxHeight: Dimensions.get('window').height - 140, minHeight: 200 }}>
                <UserInfo/>
                <UserVideos/>                
            </ScrollView>
        </SafeAreaView>
    )
}

export default Account;