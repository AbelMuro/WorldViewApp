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
    width: 30px;
    height: 10px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 15px;
    top: 25px;
`