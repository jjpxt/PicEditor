import { FC } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import AppText from '../../UI/AppText';

interface Props extends PressableProps {
    title: string;
    active?: boolean
}

const AppButton: FC<Props> = ({ title, active, ...rest }) => {
    return (
        <Pressable style={({ pressed }) => {
            return [
                styles.button, { opacity: pressed ? 0.7 : 1 },
                active && styles.active
            ]
        }} {...rest}>
            <AppText>
                {title}
            </AppText>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    active: {
        backgroundColor: "rgba(170,125,242,0.6)"
    }
});

export default AppButton;