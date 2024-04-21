import Styled from 'styled-components/native';


export const MainContainer = Styled.View`
    width: 90%;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding-top: 15px;
    margin-bottom: 50px;
`

export const NoCommentsContainer = Styled.View`
    width: 90%;
    height: 170px;
    display: flex;  
    border-color: rgb(150, 150, 150);
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto 30px auto;
`

export const NoComments = Styled.Text`
    color: black;
    font-size: 24px;
    font-family: CrimsonText-Bold;
    font-weight: 700;
`
