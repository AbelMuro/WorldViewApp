import styled from 'styled-components/native';

export const VideoTitle = styled.Text`
    width: 90%;
    margin: 0px auto 30px auto;
    color: black;
    font-family: CrimsonText;
    font-size: 24px;
    font-weight: 700;
`

export const VideoUploaderImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 200px;
`

export const VideoUploader = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    color: black;
`
export const Uploader = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 15px;
    margin: 0px auto 15px auto;
    width: 90%;
`

export const PostedOn = styled.Text`
    width: 90%;
    color: black;
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 400;
    margin: 0px auto 30px auto;
`

export const LoadingVideo = styled.View`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 40%;
    left: 40%;
    background-color: rgba(37, 37, 37, 0.8);
`