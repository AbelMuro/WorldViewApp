import React, {useEffect, useState, memo} from 'react';
import {View} from 'react-native';
import {
    ReplyContainer,
    ReplyOwnerImage,
    ReplyOwner,
    Reply,
    TimeStamp
} from './styles.js';
import firestore from '@react-native-firebase/firestore';
import icons from '~/Common/Icons';

function DisplayReply({reply, userID}) {
    const [userInfo, setUserInfo] = useState({});
    const comment = reply.comment;
    const timeStamp = reply.timeStamp;

    useEffect(() => {
        firestore().collection(userID).doc('userInfo').get().then((snapshot) => {
            setUserInfo(snapshot.data());
        })
    }, [userID])
    
    return(
        <ReplyContainer>
            <View style={{display: 'flex', gap: 10}}>
                <ReplyOwnerImage 
                    source={userInfo.imageURL ? {uri: userInfo.imageURL} : icons['emptyAvatar']}
                    resizeMode='cover' 
                    resizeMethod='resize'/>
                <ReplyOwner>
                    {userInfo.username}
                </ReplyOwner>                            
            </View>
            <Reply>
                {comment}
            </Reply>
            <TimeStamp>
                {timeStamp}
            </TimeStamp>
        </ReplyContainer>
    )
}

export default memo(DisplayReply);