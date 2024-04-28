import styled from 'styled-components/native';

export const Button = styled.Pressable`
    width: 64px;
    height: 30px;
    border-radius: 5px;
    position: absolute;
    right: 80px;
    bottom: 10px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: white;
    font-family: CrimsonText-Bold;
    font-weight: 400;
    font-size: 16px;
`