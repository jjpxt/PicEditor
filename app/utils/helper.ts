import { Platform } from "react-native"

const VERSION_15_API_LEVEL = 35;

export const isAndroidFullScreenMode = () => {
    return Platform.OS === "android" && Platform.Version >= VERSION_15_API_LEVEL;
}

type ImageSizeResult = {
    width: number,
    height: number,
    scale: number,
    actualSize: {
        width: number,
        height: number,
    }
}

export const calculateImageSizeForScreen = (
    width: number,
    height: number,
    desiredWidth: number,
    desiredHeight: number
): ImageSizeResult => {
    if (width <= 0 || height <= 0 || desiredHeight <= 0 || desiredWidth <= 0) return {
        actualSize: {
            width: 0,
            height: 0
        },
        height: 0,
        width: 0,
        scale: 0
    }
    const widhtFit = desiredWidth / width;
    const heightFit = desiredHeight / height;

    const scale = Math.min(widhtFit, heightFit);

    const finalWidth = width * scale;
    const finalHeight = height * scale;

    return {
        actualSize: {
            width,
            height
        },
        height: finalHeight,
        width: finalWidth,
        scale
    }
}