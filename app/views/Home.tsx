import { FC, useState } from 'react';
import { Linking, Platform, StyleSheet } from 'react-native';
import Page from '../UI/Page';
import FirstVisit from '../components/FirstVisit';
import { requestImageReadWritePermission } from '../utils/permissions';
import NeverAskPermissionAlert from '../components/NeverAskPermissionAlert';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { saveImagesToLocalDir } from '../utils/file-handler';

interface Props { }

// NPM RUN ANDROID

const Home: FC<Props> = () => {
    const [showPermissionAlert, setShowPermissionAlert] = useState(false);
    const [isNeverAsk, setIsNeverAsk] = useState(false);
    const handleOnCapturePress = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await requestImageReadWritePermission();
                if (!result?.valid && !result?.never_ask) {
                    return setShowPermissionAlert(true);
                }
                else if (result?.never_ask) {
                    setIsNeverAsk(true)
                    return setShowPermissionAlert(true);
                }
            }

            const { didCancel,/*errorMessage,*/ assets } = await launchCamera({
                mediaType: "photo"
            })

            if (!didCancel && assets) {
                console.log(assets)
            }

        } catch (error) {
            console.log(error)
        }
    };

    const handleOnSelectPress = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await requestImageReadWritePermission();
                if (!result?.valid && !result?.never_ask) {
                    return setShowPermissionAlert(true);
                }
                else if (result?.never_ask) {
                    setIsNeverAsk(true)
                    return setShowPermissionAlert(true);
                }
            }

            const { didCancel, /*errorMessage*/ assets } = await launchImageLibrary({
                mediaType: "photo"
            })

            if (!didCancel && assets) {
                const asset = assets[0];

                asset.uri ? await saveImagesToLocalDir(asset.uri) : null;
            }

        } catch (error) {
            console.log(error)
        }
    };

    const hidePermissionModal = () => setShowPermissionAlert(false);

    const handleOnOpenSettings = () => {
        Linking.openSettings()
    }

    const handleOnAskPermissionAgain = () => {
        setShowPermissionAlert(false);
        handleOnCapturePress();
    }

    return (
        <>
            <Page style={styles.container}>
                <FirstVisit onSelectPress={handleOnSelectPress} onCapturePress={handleOnCapturePress} />
            </Page>
            <NeverAskPermissionAlert
                visible={showPermissionAlert}
                onClose={hidePermissionModal}
                buttonProps={{
                    titleOne: "Close",
                    titleTwo: isNeverAsk ? "Open Settings" : "Ask Me Again",
                    onPressOne: hidePermissionModal,
                    onPressTwo: isNeverAsk ? handleOnOpenSettings : handleOnAskPermissionAgain
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Home;