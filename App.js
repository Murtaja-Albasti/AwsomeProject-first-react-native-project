import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState ,useRef } from 'react';

import ImageViewer from './components/ImageViewer'
import Button from './components/Button'
import * as ImagePicker from 'expo-image-picker'
const PlaceHolderImage = require('./assets/images/background-image.png')
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from 'react-native-view-shot';

import * as MediaLibrary from 'expo-media-library';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync,7000)//Meow !

export default function App() {

const onReset= ()=>{
  setShowAppOptions(false);
}

const onAddSticker = () => {
  setIsModalVisible(true);
};

const onModalClose = ()=>{
  setIsModalVisible(false);
}

const onSaveImageAsync = async () => {
  try {
    const localUri = await captureRef(imageRef, {
      height: 440,
      quality: 1,
    });

    await MediaLibrary.saveToLibraryAsync(localUri);
    if (localUri) {
      alert("Saved!");
    }
  } catch (e) {
    console.log(e);
  }
};

const [status, requestPermission] = MediaLibrary.usePermissions();

if (status === null) {
  requestPermission();
}

const [pickedEmoji, setPickedEmoji] = useState(null);
const [isModalVisible,setIsModalVisible] = useState(false)
const [showAppOptions,setShowAppOptions]= useState(false)
const [selectedImage,setSelectedImage] = useState(null)
const imageRef = useRef();

const pickImageAsync = async ()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality:1,
  })
  if(!result.canceled){
    setSelectedImage(result.assets[0].uri)
    setShowAppOptions(true)
  }else{
    alert("you did not select any image.")
  }
}

 
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
            <View ref={imageRef} collapsable={false}>
            <ImageViewer placeHolderImageSource={PlaceHolderImage} selectedImage={selectedImage} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
            </View>
      </View>
      {showAppOptions ? (
         <View style={styles.optionsContainer}>
         <View style={styles.optionsRow}>
           <IconButton icon="refresh" label="Reset" onPress={onReset} />
           <CircleButton onPress={onAddSticker} />
           <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
         </View>
       </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style='light'/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop:58,
  },
  image:{
    width:320,
    height:440,
    borderRadius:18,
  },
  footerContainer:{
    flex:1/3,
    alignItems:'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
