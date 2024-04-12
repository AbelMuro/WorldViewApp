import React, {useState} from 'react';
import {View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Dialog from "react-native-dialog";
import {launchImageLibrary} from 'react-native-image-picker';
import { 
    UploadVideoButton, 
    ButtonText, 
    SelectBox
} from './styles.js';


//need to find a way to implement a dropdown in the dialog
function UploadVideo() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const handleDialog = () => {
        setOpen(!open);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleUpload = async () => {
        try{
            const video = await launchImageLibrary({
                mediaType: 'video',
            });        
        }
        catch(error){
            if(error === 'camera_unavailable')
                Alert.alert('Camera is not available')
            else if(error = 'permission')
                Alert.alert("Please allow app to access images in permissions");
            console.log(error);
        }
    }

    return(
        <>
            <UploadVideoButton onPress={handleDialog}>
                <ButtonText>
                    upload videos
                </ButtonText>
            </UploadVideoButton>   
            <Dialog.Container visible={open}>
                <Dialog.Title>
                    Upload Video
                </Dialog.Title>
                <Dialog.Input label={'Enter Title'}/>
                <SelectDropdown
                    data={[{ title: 'happy'}, {title: 'sad'}]}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <SelectBox>
                                <Text style={{color: 'red'}}>
                                    {(selectedItem && selectedItem.title) || 'Select your od'}
                                </Text>
                            </SelectBox>
                        );
                        }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{color: 'red'}}>
                                <Text>{item.title}</Text>
                            </View>
                        );
                        }}
                    showsVerticalScrollIndicator={false}
                />    
                <Dialog.Button label='Cancel' onPress={handleCancel}/>
            </Dialog.Container>
        </>

    )
}

export default UploadVideo;