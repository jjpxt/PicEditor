import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Page from '../UI/Page';
import AppButton from './ui/AppButton';

interface Props { }

const ImageCropper: FC<Props> = () => {
    return (
        <Page style={styles.container}>
            <View style={styles.header}>
                <AppButton title='Reset' />
                <AppButton title='Done' />
            </View>
        </Page>

    );
}

const styles = StyleSheet.create({
    container: {},
    header: {
        width: "100%",
        height: 60,
        backgroundColor: "#222",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    }
});

export default ImageCropper;