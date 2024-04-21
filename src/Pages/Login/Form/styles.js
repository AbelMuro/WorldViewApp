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
    font-family: CrimsonText-Bold;
    font-weight: 400;
    letter-spacing: 0.075px;
    text-transform: uppercase;
`
export const ErrorMessage = Styled.Text`
    color: red;
    font-size: 14px;
    font-weight: 700;
    font-family: CrimsonText-Bold;
`