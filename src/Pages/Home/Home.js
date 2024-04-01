import React from 'react';
import {SafeAreaView} from 'react-native';
import HeaderBar from '~/Components/HeaderBar';
import MenuBar from '~/Components/MenuBar';
import DisplayAllVideos from './DisplayAllVideos';

function Home() {
    return(
        <SafeAreaView>
            <HeaderBar/>
            <MenuBar/>
            <DisplayAllVideos/>
        </SafeAreaView>

    )
}

export default Home;