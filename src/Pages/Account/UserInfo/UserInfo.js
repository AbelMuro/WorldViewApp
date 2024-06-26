import React, {useState, useEffect} from 'react';
import UpdateAccount from './UpdateAccount';
import DeleteAccount from './DeleteAccount';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    AccountSection, 
    AccountInfo, 
    AccountImage,
    UserName,
    Title,
    Detail
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import icons from '~/Common/Icons';
import {Actions} from 'react-native-router-flux';

function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const formatDateJoined = (creationTime) => {
        const dateCreated = new Date(creationTime);
        return dateCreated.toDateString();
    }

    useEffect(() => {
        if(!auth().currentUser) {
            Actions.login();
            return;
        }
        const userDoc = firestore().collection(`${auth().currentUser.uid}`).doc('userInfo');
        userDoc.onSnapshot((doc) => {
            setLoading(true);
            setUserInfo(doc.data());   
            setLoading(false);
        })               
    }, [])

    return(
                <AccountSection>
                    <AccountInfo>
                        {
                            loading ? <Text>loading...</Text> : <AccountImage source={userInfo && userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']} resizeMode='cover' resizeMethod='resize'/> 
                        }        
                        {
                            loading ? <Text>Loading </Text> : <UserName>{userInfo && userInfo.username}</UserName>
                        }
                        <View style={{display: 'flex', gap: 7, alignSelf: 'start'}}>
                            <Title>
                                Email:    
                            </Title>  
                            {
                                loading ? <Text> Loading</Text> : <Detail>{auth().currentUser && auth().currentUser.email}</Detail>
                            }                       
                        </View>     
                        <View style={{display: 'flex', gap: 7, alignSelf: 'start'}}>
                            <Title>
                                First Joined:    
                            </Title>  
                            {
                                loading ? <Text> Loading</Text> : <Detail>{auth().currentUser && formatDateJoined(auth().currentUser.metadata.creationTime)}</Detail>
                            }                       
                        </View>    
                        <View style={{display: 'flex', gap: 7, alignSelf: 'start'}}>
                            <Title>
                                About Me:     
                            </Title>  
                            {
                                loading ? <Text> Loading</Text> : <Detail>{userInfo && userInfo.aboutMe ? userInfo.aboutMe : "User hasn't written anything"}</Detail>
                            }                       
                        </View>    
                        {loading ? <Text>Loading </Text> : 
                        <UpdateAccount 
                            username={userInfo && userInfo.username} 
                            aboutme={userInfo && userInfo.aboutMe}/>}
                        <DeleteAccount/>
                    </AccountInfo>
                </AccountSection>
    )
}

export default UserInfo;