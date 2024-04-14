import styled from 'styled-components/native';

export const AccountSection = styled.View`
    width: 100%;
    background-color: rgb(24, 19, 19);
    padding: 20px;
`

export const AccountImage = styled.Image`
    width: 250px;
    height: 250px;
    border-radius: 200px;
    align-self: center;
`


export const AccountInfo = styled.View`
    display: flex;
    gap: 30px;
`

export const UserName = styled.Text`
    color: white;
    font-size: 25px;
    font-family: CrimsonText;
    font-weight: 400;
    align-self: center;
`

export const Title = styled.Text`
    color: white;
    font-size: 25px;
    font-family: CrimsonText;
    font-weight: 700;
`

export const Detail = styled.Text`
    color: white;
    font-size: 25px;
    font-family: CrimsonText;
    font-weight: 400;
`