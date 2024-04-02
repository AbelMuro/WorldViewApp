import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles.js';

function CircularLoadingBar() {
    return(
        <Container>
            <ActivityIndicator size='medium' color='grey'/>
        </Container>
    )
}

export default CircularLoadingBar;