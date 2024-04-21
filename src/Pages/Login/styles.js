import Styled from 'styled-components/native';

export const LoginContainer = Styled.View`
    width: 90%;
    margin: 30px auto 0px auto;
    padding: 20px;
    border-radius: 15px;
    background-color: rgb(37, 37, 37);
    display: flex;
    gap: 20px;
`

export const LoginTitle = Styled.Text`
    color: white;
    font-size: 24px;
    font-family: CrimsonText-Bold;
    font-weight: 700;
    text-align: center;
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
    font-family: CrimsonText-Bold;
    font-weight: 700;
`

export const Message = Styled.Text`
    color: white;
    font-family: CrimsonText-Bold;
    font-size: 16px;
    font-weight: 400;
`