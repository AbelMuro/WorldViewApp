import styled from 'styled-components/native';

export const Title = styled.Text `
    font-size: 25px;
    font-weight: 700;
    font-family: CrimsonText;
    margin: 20px 0px 20px 0px;
    text-align: center;
`

export const AllVideos = styled.FlatList`
    width: 90%;
`

export const VideoContainer = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
`

export const VideoTitle = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.075px;
`