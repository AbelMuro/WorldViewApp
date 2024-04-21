import styled from 'styled-components/native';

export const AllVideos = styled.View`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin: 30px auto 70px auto;
`

export const Message = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    color: black;
`

export const VideoThumbnail = styled.Image`
    width: 300px;
    height: 170px;
    border-radius: 10px;
`

export const VideoContainer = styled.View`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
`

export const VideoTitle = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    color: black;
`