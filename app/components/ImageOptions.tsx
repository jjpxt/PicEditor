import { FC } from 'react';
import Icon from "@react-native-vector-icons/entypo"
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
    onDeletePress?(): void;
    onEditPress?(): void;
}

const ImageOptions: FC<Props> = ({onDeletePress, onEditPress}) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onDeletePress} style={styles.button}>
                <Icon name="trash" size={24} color="white" />
            </Pressable>

            <Pressable onPress={onEditPress} style={styles.button}>
                <Icon name="edit" size={24} color="white" />
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        padding: 20,
        borderRadius: 18,
        backgroundColor: "rgba(77, 12, 73, 0.4)"
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ImageOptions;