import { StyleSheet, Image } from "react-native";

export default function ImageViewer({placeHolderImageSource , selectedImage}){
    const ImageSource = selectedImage ? {uri:selectedImage}:placeHolderImageSource
    return(
        <Image source={ImageSource} style={styles.image} />
    )
}

const styles = StyleSheet.create({
 image:{
    width :320,
    height:440,
    borderRadius:18
 }
})