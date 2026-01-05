import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppText from '../UI/AppText';

interface Props { }

const FirstVisit: FC<Props> = () => {
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
                        Pick a image from your gallery or capture a new one to begin
                    </AppText>
                </View>
                <View></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20
    },
    imageContainer: {},
    heroImage: {
        margin: "auto"
    },
    bottomContainer: {},
    title: {
        fontSize: 26,
        textAlign: "left"
    },
    subTitle: {
        fontSize: 20,
        textAlign: "left",
        paddingTop: 5
    }
});

export default FirstVisit;