import { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface Props extends TextProps { }

const AppText: FC<Props> = ({ children, ...props }) => {
    return (
        <Text {...props} style={[styles.text, props.style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "#FFFFFF"
    }
});

export default AppText;