import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AppText from '../../UI/AppText';

interface Props {
    title: string
}

const AppButton: FC<Props> = ({ title }) => {
    return (
        <Pressable style={({ pressed }) => {
            return [styles.button, { opacity: pressed ? 0.7 : 1 }]
        }}>
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
        backgroundColor: "#333"
    }
});

export default AppButton;