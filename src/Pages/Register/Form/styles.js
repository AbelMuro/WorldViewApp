import styled from 'styled-components/native';

export const Button = styled.Pressable`
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(254, 254, 254);  
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: black;
    font-size: 13px;
    font-family: CrimsonText;
    font-weight: 400;
    text-transform: uppercase;
`

export const ErrorMessage = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    color: red;
`