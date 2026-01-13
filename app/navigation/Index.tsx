// Navigation.tsx
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../views/Home';
import EditingCanvas from '../views/EditingCanvas';

export type StackNavigationProps = {
    Home: undefined;
    EditingCanvas: { image: string };
};

const RootStack = createNativeStackNavigator<StackNavigationProps>({
    screens: {
        Home,
        EditingCanvas,
    },
    screenOptions: {
        headerShown: false,
    },
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;