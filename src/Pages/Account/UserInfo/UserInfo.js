import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
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

function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const formatDateJoined = (creationTime) => {
        console.log(creationTime);
        const dateCreated = new Date(Number(creationTime));
        return dateCreated.toDateString();
    }


    useEffect(() => {
        if(!auth().currentUser) return;
        setLoading(true);

        async function getUserImage() {
            try{
                const userDoc = await firestore().collection(`${auth().currentUser.uid}`).doc('userInfo').get();
                setUserInfo(userDoc.data());              
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        getUserImage();
    }, [])

    return(
        <ScrollView>
                <AccountSection>
                    <AccountInfo>
                        {
                            loading ? <Text>loading...</Text> : <AccountImage source={{uri: userInfo.imageURL}}/>
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
                    </AccountInfo>
                </AccountSection>
            </ScrollView>
    )
}

export default UserInfo;