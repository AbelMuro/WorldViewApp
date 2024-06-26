import styled from 'styled-components/native';

export const VideoContainer = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin: auto;
`

export const VideoTitle = styled.Text`
    color: black;
    font-family: CrimsonText-Bold;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.075px;
`

export const VideoThumbnail = styled.Image `
    width: 300px;
    height: 172px;
    border-radius: 20px;
`

export const VideoOwnerImage = styled.Image `
    width: 50px;
    height: 50px;
    border-radius: 100px;
`

export const VideoOwner = styled.Text`
    color: black;
    font-family: CrimsonText-Bold;
    font-size: 16px;
    font-weight: 700;
`

export const PostedDate = styled.Text`
    color: black;
    font-family: CrimsonText-Bold;
    font-size: 16px;
`