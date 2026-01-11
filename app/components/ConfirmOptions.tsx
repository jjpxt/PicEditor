import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    title?: string;
    regularBtnTitle: string;
    destructiveBtnTitle: string;
    onRegularBtnPress?(): void;
    onDestructiveBtnPress?(): void;
}

const ConfirmOptions: FC<Props> = ({ title, regularBtnTitle, destructiveBtnTitle, onRegularBtnPress, onDestructiveBtnPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.btnContainer}>
                <Pressable onPress={onRegularBtnPress} style={[styles.button, styles.cancel]} >
                    <Text style={styles.btnText}>{regularBtnTitle}</Text>
                </Pressable>
                <Pressable onPress={onDestructiveBtnPress} style={[styles.button, styles.confirm]}>
                    <Text style={styles.btnText}>{destructiveBtnTitle}</Text>
                </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "90%",
        borderRadius: 8,
        padding: 20,
        alignItems: "center",
        gap: 20
    },
    title: {
        color: "black",
        justifyContent: "center",
        fontSize: 19,
    },
    button: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "rgb(36, 6, 6)",
        fontSize: 18
    },
    confirm: {
        backgroundColor: "#be060fe3"
    },
    cancel: {
        backgroundColor: "#f3e00edd"
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    }
});

export default ConfirmOptions;