import styled from 'styled-components/native';

export const Bar = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: rgb(37, 37, 37);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const Menu = styled.FlatList`
    width: 100%;
    height: auto;
    background-color: rgb(37, 37, 37);
`

export const MenuLink = styled.Pressable `
    width: 100%;
    height: 40px;
    border-left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LinkText = styled.Text`
    color: white;
    font-family: CrimsonText;
    font-weight: 400;
`

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: white;
`