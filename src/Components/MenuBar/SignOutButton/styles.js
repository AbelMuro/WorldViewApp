import styled from 'styled-components/native';

export const Button = styled.Pressable`
    position: absolute;
    top: 6px;
    right: 10px;
    width: 70px;
    height: 27px;
    border-radius: 10px;
    background-color: rgb(244, 243, 243);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    color: rgb(70, 70, 70);
    font-family: CrimsonText;
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
`