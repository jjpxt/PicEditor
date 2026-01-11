import { ReactNode, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props<T> {
    data: T[];
    renderItem(item: T): ReactNode;
    col?: number;
}

const GAP = 10

const GridView = <T extends unknown>({ data, renderItem, col = 2 }: Props<T>) => {
    const [containerWidth, setContainerWidth] = useState(0);

    return (
        <View
            onLayout={evt => {
                setContainerWidth(evt.nativeEvent.layout.width)
            }}
            style={styles.container}>
            <FlatList
                data={data}
                numColumns={col}
                contentContainerStyle={{ gap: GAP }}
                renderItem={({ item, index }) => {
                    const size = (containerWidth - GAP * (col - 1)) / col;
                    return <View
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            width: size,
                            height: size,
                            marginRight: (index + 1) % col === 0 ? 0 : GAP,
                            borderRadius: 8,
                            overflow: "hidden"
                        }}>
                        {renderItem(item)}
                    </View>
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {}
});

export default GridView;