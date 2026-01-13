import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StackNavigationProps } from '../navigation';
import Page from '../UI/Page';
import { Canvas, Group, Image, useImage, useCanvasRef } from '@shopify/react-native-skia';
import Icon from "@react-native-vector-icons/entypo"
import AppText from '../UI/AppText';


type Props = NativeStackScreenProps<StackNavigationProps, "EditingCanvas">

const EditingCanvas: FC<Props> = ({ route }) => {
    const canvasRef = useCanvasRef();
    const image = useImage(route.params.image);

    const handleOnExportPress = () => {
        const imagePress = canvasRef.current?.makeImageSnapshot();
        const base64Image = imagePress?.encodeToBase64()
        console.log(base64Image?.slice(0, 25))
    }

    return (
        <Page style={styles.container}>
            <View>
                <Pressable onPress={handleOnExportPress} style={styles.button}>
                    <AppText style={styles.buttonStyle}>Export</AppText>
                    <Icon name='save' size={18} color="white" />
                </Pressable>
            </View>
            <Canvas ref={canvasRef} style={{ width: 300, height: 300, backgroundColor: "white" }}>
                <Group>
                    <Image image={image} width={200} height={200} />
                </Group>
            </Canvas>
        </Page>

    );
}

const styles = StyleSheet.create({
    container: {},
    button: {
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    buttonStyle: {
        fontSize: 18,
        fontWeight: "500"
    }
});

export default EditingCanvas;