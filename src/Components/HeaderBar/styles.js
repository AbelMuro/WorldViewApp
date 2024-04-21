import styled from 'styled-components/native';

export const Header = styled.View `
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const Title = styled.Text `
    color: white;
    font-size: 16px;
    font-family: CrimsonText;
    font-weight: 700;
    text-transform: uppercase;
`

export const GoBackButton = styled.Pressable`
    width: 70px;
    height: 40px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 10px;
`

export const AccountCircle = styled.View`
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginButton = styled.Pressable`
    width: 70px;
    height: 40px; 
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 0px;
`

export const TitleContainer = styled.TouchableOpacity`
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`