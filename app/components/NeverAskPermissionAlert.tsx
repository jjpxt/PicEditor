import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppModal from './AppModal';
import AppText from '../UI/AppText';
import BulletList from '../UI/BulletList';

interface Props {
    buttonProps?: {
        titleOne: string;
        titleTwo: string;
        onPressOne?(): void;
        onPressTwo?(): void;
    }
    visible?: boolean;
    onClose?(): void
}

const NeverAskPermissionAlert: FC<Props> = ({ buttonProps, visible, onClose }) => {
    return (
        <AppModal visible={visible} onClose={onClose}>
            <View style={styles.container}>
                <AppText style={styles.title}>
                    To  use the complete feature of this app you must give this app these permissions
                </AppText>

                <View>
                    <BulletList
                        data={["Camera", "Reading Images", "Writing Images"]}
                        style={styles.list}
                        renderText={item => {
                            return <AppText style={styles.listItem}>
                                {item}
                            </AppText>
                        }}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Pressable style={styles.button} onPress={buttonProps?.onPressOne}>
                        <AppText style={styles.btnText}>{buttonProps?.titleOne}</AppText>
                    </Pressable>

                    <Pressable style={styles.button} onPress={buttonProps?.onPressTwo}>
                        <AppText style={styles.btnText}>{buttonProps?.titleTwo}</AppText>
                    </Pressable>
                </View>

            </View>
        </AppModal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#060706",
        gap: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "400"
    },
    listItem: {
        fontSize: 18,
        fontWeight: "500"
    },
    list: {
        paddingHorizontal: 20
    },
    button: {
        flex: 1,
        height: 45,
        borderRadius: 8,
        backgroundColor: "#181c14",
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: 18,
        textDecorationLine: "underline"
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
    }
});

export default NeverAskPermissionAlert;