import Styled from 'styled-components/native';

export const Container = Styled.View`
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 15px;
`

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
    color: black;
    font-size: 16px;
    font-family: CrimsonText;
    font-weight: 700;
`

export const Reply = Styled.Text`
    color: black;
    font-size: 16px;
    font-weight: 400;
    font-family: CrimsonText;
    padding: 30px 15px;
`

export const TimeStamp = Styled.Text`
    color: black;
    font-size: 16px;
    font-weight: 400;
    font-family: CrimsonText;
    position: absolute;
    top: 10px;
    right: 10px;
`