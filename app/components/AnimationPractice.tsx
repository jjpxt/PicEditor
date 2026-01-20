import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props { }

const AnimationPractice: FC<Props> = () => {
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const logMe = (value: any) => {
        console.log(value);
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translationX.value
                },
                {
                    translateY: translationY.value
                }
            ]
        }
    });

    const gesture = Gesture.Pan()
        .onBegin(() => {
            runOnJS(logMe)("gesture")
        })
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
            console.log('second')
        })
        .onChange(evt => {
            translationX.value = prevTranslationX.value + evt.translationX
            translationY.value = prevTranslationY.value + evt.translationY
            console.log("change")
        })
        .onEnd(() => {
            console.log('fourth')
        })
        .onFinalize(() => {
            console.log('final')
        })

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.box, animatedStyle]}>
                    <Pressable onPress={() => {
                        translationX.value = translationX.value + 50;
                    }}>
                        <Text>Move me</Text>
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'lightblue',
        borderRadius: 10
    }
});

export default AnimationPractice;