import styled from "styled-components/native";

export const UploadVideoButton = styled.Pressable`
    width: 142px;
    height: 36px;
    border-radius: 4px;
    background-color: rgb(224, 223, 223);
    color: rgb(70, 70, 70);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text`
    font-family: CrimsonText;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
`

export const TitleContainer = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
`

export const LoadingContainer = styled.View`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const UploadedFileContainer = styled.View`
    width: 90%;
    display: flex;
    align-items: center;
    margin: 0px auto 20px auto;
`

export const UploadedFileName = styled.Text`
    font-family: CrimsonText;
    font-size: 16px;
    font-weight: 700;
`