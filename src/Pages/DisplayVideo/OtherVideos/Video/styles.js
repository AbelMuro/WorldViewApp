import Styled from 'styled-components/native';

export const VideoContainer = Styled.View`
    width: 100%;
    padding: 20px;
    border-style: solid;
    border-width: 1px;
    border-color: grey;
    border-radius: 10px;
    display: flex;
    gap: 10px;
`

export const VideoThumbnail = Styled.Image`
    width: 310px;
    height: 175px;
`

export const VideoTitle = Styled.Text`
    font-size: 26px;
    color: black;
    font-family: CrimsonText-Bold;
`