import { FC, ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { isAndroidFullScreenMode } from '../utils/helper';

interface Props {
    children: ReactNode
    style?: StyleProp<ViewStyle>
    background?: string
}

const Page: FC<Props> = ({ children, style, background }) => {
    const backgroundColor = background || "#181c14";
    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <View style={[styles.innerContainer, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:
            isAndroidFullScreenMode() ? StatusBar.currentHeight : 0,

    },
    innerContainer: {
        flex: 1
    }
});

export default Page;