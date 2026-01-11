import { FC, ReactNode } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import Page from '../UI/Page';

interface Props {
    visible?: boolean
    children?: ReactNode
    onClose?(): void
}

const AppModal: FC<Props> = ({ visible = false, children, onClose }) => {
    return (
        <Modal
            navigationBarTranslucent
            statusBarTranslucent
            transparent
            onRequestClose={onClose}
            visible={visible}
            animationType="fade">
            <Page background="rgba(0,0,0,0.5)">
                <Pressable
                    style={styles.overlay}
                    onPress={onClose}>
                    {children}
                </Pressable>
            </Page>
        </Modal>

    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AppModal;


