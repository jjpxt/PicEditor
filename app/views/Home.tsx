import React, { FC, useEffect, useState } from 'react';
import { Image, Linking, Platform, Pressable, StyleSheet, } from 'react-native';
import Page from '../UI/Page';
import FirstVisit from '../components/FirstVisit';
import { requestImageReadWritePermission } from '../utils/permissions';
import NeverAskPermissionAlert from '../components/NeverAskPermissionAlert';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getLocalImages, LocalImage, removeFile, saveImagesToLocalDir } from '../utils/file-handler';
import AppText from '../UI/AppText';
import GridView from '../UI/GridView';
import Icon from "@react-native-vector-icons/entypo"
import AppModal from '../components/AppModal';
import ImageOptions from '../components/ImageOptions';
import ConfirmOptions from '../components/ConfirmOptions';

interface Props { }

// NPM RUN ANDROID

const Home: FC<Props> = () => {
    const [showPermissionAlert, setShowPermissionAlert] = useState(false);
    const [isNeverAsk, setIsNeverAsk] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [images, setImages] = useState<LocalImage[]>([])

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

    const hideImageOptionModal = () => {
        setShowImageOptions(false);
        setSelectedImage(null)
        setInterval(() => {
            setConfirmDelete(false);
        }, 100);
    }

    const handleLocalFilesScan = async () => {
        return await getLocalImages()
            .then(res => {
                if (!res.length)
                    setIsFirstVisit(true)
                else
                    setImages(res)
            })
    }

    const handleOnImageRemove = async () => {
        if (!selectedImage) return;
        await removeFile(selectedImage);
        await handleLocalFilesScan();
        hideImageOptionModal();
    }

    useEffect(() => {
        handleLocalFilesScan()
            .finally(() => {
                setIsReady(true);
            });
    }, [])

    if (!isReady)
        return (
            <Page style={styles.busyContainer}>
                <AppText>Loading...</AppText>
            </Page>
        )

    if (isFirstVisit)
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

    return (
        <>
            <Page style={styles.container}>
                <Pressable style={styles.addButton} >
                    <Icon name='plus' color={"white"} size={24} />
                </Pressable>
                <AppText style={styles.title}>Previous Edits</AppText>
                <GridView
                    col={2}
                    renderItem={item => (
                        <Pressable onLongPress={() => {
                            setSelectedImage(item.path)
                            setShowImageOptions(true)
                        }}
                            style={styles.imageContainer} >
                            <Image
                                source={{ uri: item.path }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                    data={images}
                />
            </Page>
            <AppModal visible={showImageOptions} onClose={hideImageOptionModal}>
                {!confirmDelete ? (
                    <ImageOptions onDeletePress={() => setConfirmDelete(true)} />
                ) : (
                    <ConfirmOptions
                        regularBtnTitle='Cancel'
                        destructiveBtnTitle='Confirm'
                        onRegularBtnPress={hideImageOptionModal}
                        onDestructiveBtnPress={handleOnImageRemove}
                        title='r u sure?' />
                )}
            </AppModal>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
        position: "relative"
    },
    busyContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        flex: 1
    },
    image: {
        flex: 1
    },
    title: {
        fontSize: 22,
        fontWeight: "600"
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 1,
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#40423f"
    }
})

export default Home;