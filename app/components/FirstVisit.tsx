import { FC } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import AppText from '../UI/AppText';
import Icon from "@react-native-vector-icons/entypo"

interface Props {
    onCapturePress?(): void
    onSelectPress?(): void
}

const FirstVisit: FC<Props> = ({ onCapturePress, onSelectPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../source/hero.png")}
                    style={styles.heroImage}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View>
                    <AppText style={styles.title}>
                        Start editing your first image
                    </AppText>
                    <AppText style={styles.subTitle}>
                        Pick a image from your gallery or capture a new one to begin!
                    </AppText>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={onCapturePress} style={styles.button}>
                        <Icon size={20} name='camera' color="white" />
                        <AppText style={styles.buttonTitle}>Capture</AppText>
                    </Pressable>
                    <Pressable onPress={onSelectPress} style={styles.button}>
                        <Icon size={20} name='images' color="white" />
                        <AppText style={styles.buttonTitle}>Select</AppText>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        padding: 20
    },
    imageContainer: {
        // flex: 1
    },
    heroImage: {
        margin: "auto"
    },
    bottomContainer: {
        gap: 40
    },
    title: {
        fontSize: 28,
        textAlign: "center"
    },
    subTitle: {
        fontSize: 24,
        paddingTop: 5,
        textAlign: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
    },
    button: {
        gap: 1,
        flex: 1,
        height: 45,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#40423f"
    },
    buttonTitle: {
        fontSize: 18
    }
});

export default FirstVisit;