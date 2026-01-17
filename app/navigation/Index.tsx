// Navigation.tsx
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../views/Home';
import EditingCanvas from '../views/EditingCanvas';
import ImageCropper from '../image-cropper';

export type StackNavigationProps = {
    Home: undefined;
    EditingCanvas: { image: string };
    ImageCropper: { src: string }
};

const RootStack = createNativeStackNavigator<StackNavigationProps>({
    screens: {
        Home,
        EditingCanvas,
        ImageCropper
    },
    screenOptions: {
        headerShown: false,
    },
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;