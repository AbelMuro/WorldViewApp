import Styled from 'styled-components/native';

export const LoginButton = Styled.Pressable`
    width: 100%;
    height: 36px;
    border-radius: 4px;
    background-color: rgb(254, 254, 254);  
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginText = Styled.Text`
    color: rgb(70, 70, 70);
    font-size: 14px;
    font-family: CrimsonText;
    font-weight: 400;
    letter-spacing: 0.075px;
    text-transform: uppercase;
`

export const Message = Styled.Text`
    color: white;
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
`

export const Button = Styled.Pressable`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(254, 254, 254);  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const ButtonText = Styled.Text`
    color: black;
    font-size: 13px;
    font-family: CrimsonText;
    font-weight: 700;
`