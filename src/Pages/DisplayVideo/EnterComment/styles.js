import styled from 'styled-components/native';


export const CommentInput = styled.TextInput`
    width: 90%;
    height: 50px;
    padding: 16px 14px 16px 14px; 
    margin: 0px auto 15px auto;
    border: 1px solid grey;
    border-radius: 5px;
`

export const SubmitComment = styled.Pressable`
    width: 90%;
    height: 36.5px;
    margin: auto;
    border-radius: 5px;
    background-color: rgb(204, 204, 204);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: rgb(70, 70, 70);
    font-family: CrimsonText-Bold;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.075px;
    text-transform: uppercase;
`