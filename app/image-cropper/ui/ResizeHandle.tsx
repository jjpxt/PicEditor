import { FC } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export const cropHandles = [
    'top-left',
    'top-center',
    'top-right',
    'right-center',
    'bottom-right',
    'bottom-center',
    'bottom-left',
    'left-center'
] as const;

const HANDLE_SIZE = 25;
const HANDLE_BORDER_SIZE = 4

export const baseStyle: StyleProp<ViewStyle> = {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    position: 'absolute',
    zIndex: 10,
    borderColor: 'white',
};

export type HandleType = (typeof cropHandles)[number];

interface Props {
    type: HandleType
    onPressIn(value: HandleType): void
}


const sizeSpecificStyle: Record<HandleType, StyleProp<ViewStyle>> = {
    "top-left": {
        borderTopWidth: HANDLE_BORDER_SIZE,
        borderLeftWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateX: -HANDLE_BORDER_SIZE },
            { translateY: -HANDLE_BORDER_SIZE }
        ]
    }, "top-center": {
        position: 'relative',
        marginHorizontal: 'auto',
        borderTopWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateY: -HANDLE_BORDER_SIZE }],
    },
    "top-right": {
        right: 0,
        borderTopWidth: HANDLE_BORDER_SIZE,
        borderRightWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateX: HANDLE_BORDER_SIZE },
            { translateY: -HANDLE_BORDER_SIZE }
        ]
    },
    'right-center': {
        right: 0,
        top: '50%',
        borderRightWidth: HANDLE_BORDER_SIZE,
        transform: [{ translateY: '-50%' }, { translateX: HANDLE_BORDER_SIZE }]
    },
    'bottom-right': {
        right: 0,
        bottom: 0,
        borderRightWidth: HANDLE_BORDER_SIZE,
        borderBottomWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateY: HANDLE_BORDER_SIZE },
            { translateX: HANDLE_BORDER_SIZE }
        ]
    },
    "bottom-center": {
        bottom: 0,
        left: '50%',
        borderBottomWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateY: HANDLE_BORDER_SIZE },
            { translateX: "-50%" }
        ]
    },
    "bottom-left": {
        bottom: 0,
        borderBottomWidth: HANDLE_BORDER_SIZE,
        borderLeftWidth: HANDLE_BORDER_SIZE,
        transform: [
            { translateY: HANDLE_BORDER_SIZE },
            { translateX: -HANDLE_BORDER_SIZE }
        ]
    },
    'left-center': {
        left: 0,
        top: '50%',
        borderLeftWidth: HANDLE_BORDER_SIZE,
        transform: [{ translateY: '-50%' }, { translateX: -HANDLE_BORDER_SIZE }]
    },
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ResizeHandle: FC<Props> = ({ type, onPressIn }) => {
    const handleStyle = { ...baseStyle, ...sizeSpecificStyle[type] as object }
    return (
        <AnimatedPressable onPressIn={() => onPressIn(type)} style={handleStyle}>

        </AnimatedPressable>

    );
}

// const styles = StyleSheet.create({
//     container: {}
// });

export default ResizeHandle;