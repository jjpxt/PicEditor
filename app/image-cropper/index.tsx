import { FC, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Page from '../UI/Page';
import AppButton from './ui/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProps } from '../navigation';
import { loadAndCalculateImageSize } from '../utils/helper';
import ResizeHandle, { cropHandles, HandleType } from './ui/ResizeHandle';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<StackNavigationProps, 'ImageCropper'>

const aspectRatios = ["original", "free", "1:1", "16:9", "9:16"] as const;

type AspectRatio = typeof aspectRatios[number]

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONTAINER_HEIGHT = SCREEN_HEIGHT * 0.8;
const CONTAINER_WIDTH = SCREEN_WIDTH * 0.8;

const clamp = (val: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(val, min), max);
}

const ImageCropper: FC<Props> = ({ route }) => {
    const image = route.params.src;
    const [imageWidth, setImageWidth] = useState(0);
    const [originalImageSize, setOriginalImageSize] = useState({
        width: 0,
        height: 0
    });
    const [imageHeight, setImageHeight] = useState(0);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('original');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [aspectRatio, setAspectRatio] = useState(0);

    const cropBoxWidth = useSharedValue(0);
    const cropBoxHeight = useSharedValue(0);
    const cropBoxX = useSharedValue(0);
    const cropBoxY = useSharedValue(0);
    const startX = useSharedValue(0)
    const startY = useSharedValue(0)
    const startWidth = useSharedValue(0)
    const startHeight = useSharedValue(0)

    const MIN_CROP_SIZE = 100;
    const MAX_CROP_WIDTH = imageWidth;
    const MAX_CROP_HEIGHT = imageHeight;
    const MIN_X = 0
    const MIN_Y = 0

    const activeCorner = useSharedValue<HandleType | null>(null);

    const cropBoxAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: cropBoxWidth.value,
            height: cropBoxHeight.value,
            left: cropBoxX.value,
            top: cropBoxY.value
        }
    })

    const applyAspectRatio = (ratio: AspectRatio) => {
        setSelectedAspectRatio(ratio)

        let newAspectRatio = 0;
        let newHeight = cropBoxHeight.value;
        if (ratio === 'original') {
            const { width, height } = originalImageSize;
            let localRatio = 0;

            if (width < height) {
                localRatio = height / width;
                newAspectRatio = width / height;
            } else {
                localRatio = width / height;
                newAspectRatio = height / width;
            }
            newHeight = cropBoxHeight.value * localRatio;
        }
        else if (ratio === '1:1') {
            newHeight = cropBoxWidth.value;
            newAspectRatio = 1;
        }
        else if (ratio === '16:9') {
            newHeight = (9 / 16) * cropBoxWidth.value;
            newAspectRatio = 16 / 9
        }
        else if (ratio === '9:16') {
            newHeight = (16 / 9) * cropBoxWidth.value;
            newAspectRatio = 9 / 16

            if (newHeight > cropBoxHeight.value) {
                let heightFit = newHeight - cropBoxHeight.value;

                if (heightFit < MIN_CROP_SIZE)
                    heightFit = newHeight - MIN_CROP_SIZE

                const widthFit = (9 / 16) * heightFit;
                cropBoxWidth.value = withTiming(widthFit);
                newHeight = (16 / 9) * widthFit;
            }
        }
        cropBoxHeight.value = withTiming(newHeight);
        setAspectRatio(newAspectRatio);
    }

    const resizeGesture = Gesture.Pan()
        .onStart(() => {
            startX.value = cropBoxX.value
            startY.value = cropBoxY.value
            startWidth.value = cropBoxWidth.value
            startHeight.value = cropBoxHeight.value
        })
        .onUpdate((evt) => {
            const { translationX, translationY } = evt;

            switch (activeCorner.value) {
                case 'top-left':
                    if (selectedAspectRatio === 'free') {
                        const newX = startX.value + translationX;
                        const newY = startY.value + translationY;

                        const clampedX = clamp(newX, MIN_X, MAX_CROP_WIDTH - MIN_CROP_SIZE);
                        const clampedY = clamp(newY, MIN_Y, MAX_CROP_HEIGHT - MIN_CROP_SIZE);

                        const newWidth = startWidth.value - (clampedX - startX.value);
                        const newHeight = startHeight.value - (clampedY - startY.value);

                        cropBoxX.value = clampedX;
                        cropBoxY.value = clampedY;
                        cropBoxWidth.value = clamp(newWidth, MIN_CROP_SIZE, MAX_CROP_WIDTH);
                        cropBoxHeight.value = clamp(newHeight, MIN_CROP_SIZE, MAX_CROP_HEIGHT);
                    } else {
                        const deltaY = translationY;
                        const newHeight = clamp(
                            startHeight.value - deltaY,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH / aspectRatio
                        );
                        const newWidth = newHeight * aspectRatio;

                        const withDiff = startWidth.value - newWidth;
                        const heighDiff = startHeight.value - newHeight;

                        cropBoxWidth.value = newHeight;
                        cropBoxHeight.value = newHeight;

                        cropBoxX.value = clamp(
                            startX.value + withDiff,
                            MIN_X,
                            MAX_CROP_WIDTH - newWidth
                        );

                        cropBoxY.value = clamp(
                            startY.value + heighDiff,
                            MIN_Y,
                            MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE)
                        );
                    }
                    break;

                case 'top-center':
                    if (selectedAspectRatio === 'free') {
                        const newY = startY.value + translationY;
                        const newHeight = startHeight.value - (newY - startY.value);

                        cropBoxHeight.value = clamp(newHeight, MIN_CROP_SIZE, MAX_CROP_HEIGHT);
                        cropBoxY.value = clamp(newY, MIN_Y, MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE));

                    } else {
                        const newY = startY.value + translationY;
                        const newHeight = startHeight.value - translationY;
                        const clampedHigh = clamp(
                            newHeight,
                            MIN_CROP_SIZE,
                            MAX_CROP_WIDTH / aspectRatio
                        );

                        const clampedWidth = clampedHigh * aspectRatio
                        cropBoxY.value = clamp(newY, MIN_Y, MAX_CROP_HEIGHT + (MIN_Y - MIN_CROP_SIZE));
                        cropBoxHeight.value = clampedHigh;
                        cropBoxWidth.value = clampedWidth;
                    }
                    break;
                default:
                    break;
            }
        })
        .onEnd(() => {
            activeCorner.value = null
        })

    useEffect(() => {
        const makeImageReady = async () => {
            const { height, width, actualSize } = await loadAndCalculateImageSize(
                image,
                CONTAINER_HEIGHT,
                CONTAINER_WIDTH
            );
            setOriginalImageSize(actualSize)
            setImageHeight(height);
            setImageWidth(width);

            let newAspectRatio = width / height;

            if (width > height) newAspectRatio = height / width;

            setAspectRatio(newAspectRatio);

            cropBoxWidth.value = width;
            cropBoxHeight.value = height;
        }
        makeImageReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    return (
        <Page >
            <View style={styles.header}>
                <AppButton title='Reset' />
                <AppButton title='Done' />
            </View>

            <GestureDetector gesture={resizeGesture}>
                <Animated.View style={styles.container}>
                    <View style={[styles.imageContainer, { width: imageWidth, height: imageHeight }]}>
                        <Image source={{ uri: image }} style={{ width: imageWidth, height: imageHeight }} />

                        <Animated.View style={[styles.cropBox, cropBoxAnimatedStyle]}>
                            {cropHandles.map(item => {
                                return (
                                    <ResizeHandle onPressIn={(value) => {
                                        activeCorner.value = value;
                                    }}
                                        key={item}
                                        type={item}
                                    />
                                );
                            })}
                        </Animated.View>

                    </View>
                    <View style={styles.footer}>
                        {aspectRatios.map(item => {
                            return (
                                <AppButton
                                    active={item === selectedAspectRatio}
                                    onPress={() => applyAspectRatio(item)}
                                    key={item}
                                    title={item}
                                />
                            )
                        })}
                    </View>
                </Animated.View>
            </GestureDetector>


        </Page>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "100%",
        height: 60,
        backgroundColor: "#222",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    imageContainer: {
        alignSelf: "center",
        marginVertical: "auto"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#222",
        gap: 10,
        paddingBottom: 35
    },
    cropBox: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderColor: "yellow"
    }
});

export default ImageCropper;