import { FC, ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { isAndroidFullScreenMode } from '../utils/helper';

interface Props {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

const Page: FC<Props> = ({ children, style }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.innerContainer, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:
            isAndroidFullScreenMode() ? StatusBar.currentHeight : 0,
        backgroundColor: "#181c14"
    },
    innerContainer: {
        flex: 1
    }
});

export default Page;