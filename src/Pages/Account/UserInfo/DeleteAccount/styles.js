import styles from 'styled-components/native';

export const Button = styles.Pressable`
    width: 90%;
    height: 36.5px;
    border-radius: 10px;
    background-color: rgb(244, 243, 243);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonText = styles.Text`
    color: red;
    font-family: CrimsonText-Bold;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
`