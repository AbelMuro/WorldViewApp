import Styled from 'styled-components/native';

export const ReplyContainer = Styled.View`
    width: 251px;
    border-style: solid;
    border-color: rgb(150, 150, 150);
    border-width: 1px;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: row;
`

export const ReplyOwnerImage = Styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    
`

export const ReplyOwner = Styled.Text`
    width: 100px;
    color: black;
    font-size: 16px;
    font-family: CrimsonText-Bold;
    font-weight: 700;
`

export const Reply = Styled.Text`
    width: 130px;
    color: black;
    font-size: 16px;
    font-weight: 400;
    font-family: CrimsonText-Bold;
    padding: 30px 15px;
`

export const TimeStamp = Styled.Text`
    color: black;
    font-size: 16px;
    font-weight: 400;
    font-family: CrimsonText-Bold;
    position: absolute;
    top: 10px;
    right: 10px;
`
