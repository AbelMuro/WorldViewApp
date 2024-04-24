import React, {useState, useEffect, memo} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {SubmitComment, ButtonText} from './styles.js';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function EnterComment({videoOwnerID, videoID}) {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);

    const styles = {
        input: {
            width: '90%',
            height: 50,
            padding: 16,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 14,
            borderWidth: 1,
            borderColor: error ? 'red' : 'grey',
            borderStyle: 'solid',
            borderRadius: 5,
        },
        inputText: {
            color: error ? 'red' : 'rgb(70, 70, 70)',
            fontFamily: 'CrimsonText',
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0.075,
            textTransform: 'uppercase',
        }
    }

    const isNotValidComment = () => {
        return comment === '';
    }

    const handleComment = (text) => {
        if(text.length < 200)
            setComment(text)
    }

    const handleBlur = () => {
        if(isNotValidComment())
            setError(true);
    }

    const handleSubmit = async () => {
        if(isNotValidComment()){
            Alert.alert('Please enter your comment');
            return;
        }
        if(!auth().currentUser){
            Alert.alert('You must be signed in to post a comment');
            return
        }
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();
            const readableDate = currentDate.toLocaleDateString();
            const currentHour = ((currentDate.getHours() + 11) % 12 + 1);
            const currentMinutes = currentDate.getMinutes();
            const AmOrPm = currentDate.getHours() >= 12 ? "PM" : "AM";
            const commentID = uuid.v4();
            let userInfoRef = firestore().collection(`${auth().currentUser.uid}`).doc('userInfo');
            let userInfo = await userInfoRef.get();
            userInfo = userInfo.data();

            const newComment = {
                comment,
                commentID,
                username: userInfo.username,
                userID: auth().currentUser.uid,
                userImage: userInfo.imageURL,
                order: millisecondsSince1970,
                timeStamp: `${readableDate} ${currentHour}:${currentMinutes} ${AmOrPm}`,
            }

            let commentCollectionRef = firestore().collection(`${videoOwnerID}/${videoID}/commentSection`);
            await commentCollectionRef.doc(commentID).set(newComment);
            Alert.alert('Comment has been posted');
            setComment('');
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        setError(false)
    }, [comment])

    return(
        <View style={{marginBottom: 30}}>
            <TextInput
                value={comment}
                onChangeText={handleComment}
                onBlur={handleBlur}
                placeholder={error ? 'Cannot be Empty' : 'Enter a comment'}
                placeholderTextColor={error ? 'red' : 'grey'}
                style={styles.input}
            />
            <SubmitComment onPress={handleSubmit}> 
                <ButtonText>submit comment</ButtonText>
            </SubmitComment>
        </View>
    )
}

export default memo(EnterComment);