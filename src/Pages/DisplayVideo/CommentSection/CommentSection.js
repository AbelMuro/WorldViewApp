import React, {lazy, memo} from 'react';
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
const DisplayComment = lazy(() => import('./DisplayComment'));

function CommentSection() {
    const video = useSelector(state => state.video);
    const allCommentsRef = collection(db, `${video.userID}/${video.videoID}/commentSection`);
    const [allComments, loading, error] = useCollectionData(allCommentsRef);

    return loading ? <CircularLoadingBar/> : 
            !allComments.length ? (
                    <NoCommentsContainer> 
                        <NoComments>
                            No Comments
                        </NoComments>
                    </NoCommentsContainer> 
                ) : (
            <MainContainer>
                {allComments.map((comment) => {
                    return(
                        <DisplayComment comment={comment}/>
                    )
                })}
            </MainContainer>                    
            )


    
}

export default memo(CommentSection);