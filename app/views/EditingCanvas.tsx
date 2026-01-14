import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { StackNavigationProps } from '../navigation';
import Page from '../UI/Page';
import { Canvas, Group, Image, useImage, useCanvasRef } from '@shopify/react-native-skia';
import Icon from "@react-native-vector-icons/entypo"
import MaterialIcon from "@react-native-vector-icons/material-icons"
import AppText from '../UI/AppText';
import { saveBase64ImageToDevice } from '../utils/file-handler';
import { useNavigation } from '@react-navigation/native';
import { calculateImageSizeForScreen } from '../utils/helper';


type Props = NativeStackScreenProps<StackNavigationProps, "EditingCanvas">

const tools = [
    {
        icon: 'crop',
        task: 'crop'
    },
    {
        icon: 'contrast',
        task: 'contrast'
    },
    {
        icon: 'brightness-medium',
        task: 'brightness'
    },
    {
        icon: 'photo-filter',
        task: 'filter'
    }
] as const

const { width } = Dimensions.get('window');
const padding = 10;
const canvasSize = width - padding * 2
const EditingCanvas: FC<Props> = ({ route }) => {
    const canvasRef = useCanvasRef();
    const image = useImage(route.params.image);
    const { canGoBack, goBack } = useNavigation();

    const handleOnExportPress = () => {
        const imagePress = canvasRef.current?.makeImageSnapshot();
        const base64Image = imagePress?.encodeToBase64()
        if (base64Image) saveBase64ImageToDevice(base64Image);
    }

    const handleOnClose = () => {
        canGoBack() ? goBack() : null
    }

    const actualImageWidth = image?.width() || 0;
    const actualImageHeight = image?.height() || 0;

    const size = calculateImageSizeForScreen(actualImageHeight, actualImageWidth, canvasSize, canvasSize);

    return (
        <Page style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleOnClose} style={styles.button}>
                    <Icon name='cross' size={24} color="white" />
                </Pressable>
                <Pressable onPress={handleOnExportPress} style={styles.button}>
                    <AppText style={styles.buttonStyle}>Export</AppText>
                    <Icon name='save' size={18} color="white" />
                </Pressable>
            </View>

            <Canvas ref={canvasRef} style={[styles.canvas, { width: size.width, height: size.height, backgroundColor: "white" }]}>
                <Group>
                    <Image
                        fit='contain'
                        image={image}
                        width={size.width}
                        height={size.height} />
                </Group>
            </Canvas>
            <View style={styles.footer}>
                <View style={styles.toolsContainer}>
                    {tools.map(item => {
                        return (
                            <Pressable key={item.task} style={styles.editOptionSelector}>
                                <MaterialIcon name={item.icon} color="white" size={24} />
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </Page>

    );
}

const styles = StyleSheet.create({
    container: {
        padding
    },
    editOptionSelector: {
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        borderRadius: 4
    },
    toolsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        backgroundColor: '#222',
        marginTop: 'auto',
        borderRadius: 8,
        padding: 10,
        gap: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    canvas: {
        margin: 'auto'
    },
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
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 19
    }
});

export default EditingCanvas;