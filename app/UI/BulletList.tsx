import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props<T> {
    data: T[]
    color?: string
    renderText(item: T): ReactNode
    style?: StyleProp<ViewStyle>
}

const BulletList = <T extends unknown>({ data, color = "white", style, renderText }: Props<T>) => {
    return (
        <View style={[styles.container, style]}>
            {data.map((item, index) => {
                return <View style={styles.listItem} key={index}>
                    <View style={[styles.bullet, { backgroundColor: color }]} />
                    {renderText(item)}
                </View>
            })}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {},
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    }
});

export default BulletList;