import styled from 'styled-components/native';

export const Reply = styled.Pressable`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 64px;
    height: 30px;
    border-radius: 5px;
    background-color: rgb(199, 199, 199);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: rgb(77, 77, 77);
    font-size: 16px;
    font-weight: 400;
    font-family: CrimsonText;
`

export const LoadingContainer = styled.View`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`