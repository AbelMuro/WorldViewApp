import React from 'react';
import {SafeAreaView, ScrollView, Dimensions} from 'react-native';
import UserInfo from './UserInfo';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar'; 
import UserVideos from './UserVideos';

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