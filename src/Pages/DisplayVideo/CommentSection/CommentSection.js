import React, {lazy, memo, useMemo, useEffect,useState} from 'react';
import CircularLoadingBar from '~/Components/CircularLoadingBar';
import {collection} from 'firebase/firestore';
import {db} from '~/Firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {
        MainContainer,
        NoCommentsContainer, 
        NoComments, 
} from './styles.js';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const DisplayComment = lazy(() => import('./DisplayComment'));


function CommentSection() {
    const video = useSelector(state => state.video.video);
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        firestore()
            .collection(`${video.userID}/${video.videoID}/commentSection`)
            .onSnapshot((snapshot) => {
                    setLoading(true);        
                    let comments = [];
                    snapshot.forEach((doc) => {
                        let comment = doc.data();
                        comments.push(
                            <DisplayComment comment={comment} key={comment.commentID}/>
                        )
                    })
                    setAllComments(comments);
                    setLoading(false);              
            });   
    }, [])


    return loading ? <CircularLoadingBar/> : 
            !allComments.length ? (
                    <NoCommentsContainer> 
                        <NoComments>
                            No Comments
                        </NoComments>
                    </NoCommentsContainer> 
                ) : (
            <MainContainer>
                {allComments}
            </MainContainer>                    
            )


    
}

export default memo(CommentSection);