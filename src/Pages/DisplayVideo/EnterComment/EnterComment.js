import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {SubmitComment, ButtonText} from './styles.js';
import {db} from '~/Firebase';
import {doc, setDoc} from 'firebase/firestore';
import {v4 as uuid} from 'uuid';

function EnterComment({userID, videoID}) {
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
        setComment(text)
    }

    const handleBlur = () => {
        if(isNotValidComment())
            setError(true);
    }

    //it works!
    const handleSubmit = async () => {
        if(isNotValidComment()) return;

        const currentDate = new Date();
        const millisecondsSince1970 = currentDate.getTime();
        const readableDate = currentDate.toLocaleDateString();
        const currentHour = ((currentDate.getHours() + 11) % 12 + 1);
        const currentMinutes = currentDate.getMinutes();
        const AmOrPm = currentDate.getHours() >= 12 ? "PM" : "AM";
        const commentID = 'happy';

        try{
            const newCommentRef = doc(db, `${userID}`, `${videoID}/commentSection/${commentID}`) 
            await setDoc(newCommentRef, {
                comment,
                commentID,
                userID: '',
                userImage: '',
                order: millisecondsSince1970,
                timeStamp: `${readableDate} ${currentHour}:${currentMinutes} ${AmOrPm}`,
            })
            //remember there is another async function that must be executed here
        }
        catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        setError(false)
    }, [comment])

    return(
        <View>
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

export default EnterComment;