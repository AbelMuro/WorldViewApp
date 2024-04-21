import Styled from 'styled-components/native';

export const Container = Styled.View`
    width: 90%; 
    display: flex; 
    gap: 10px; 
    margin: auto; 
`

export const CommentContainer = Styled.View`
    width: 100%;
    padding: 15px;
    border-radius: 15px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(150, 150, 150);
    display: flex;
    flex-direction: row;
    position: relative;
` 

export const CommentOwnerImage = Styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 100px;
`

export const CommentOwnerName = Styled.Text`
    width: 120px;
    color: black;
    font-size: 16px;
    font-family: CrimsonText-Bold;
    font-weight: 700;
`

export const Comment = Styled.Text`
    width: 190px; 
    color: black;
    font-size: 16px;
    font-family: CrimsonText-Bold;
    font-weight: 400;
    padding: 30px 15px;
`

export const TimeStamp = Styled.Text`
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
    font-size: 16px;
    font-family: CrimsonText-Bold;
    font-weight: 500;
`