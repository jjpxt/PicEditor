import { Platform } from "react-native"

const VERSION_15_API_LEVEL = 35;

export const isAndroidFullScreenMode = () => {
    return Platform.OS === "android" && Platform.Version >= VERSION_15_API_LEVEL;
}