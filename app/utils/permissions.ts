import { PermissionsAndroid, PermissionStatus, Platform } from "react-native"

const {
    WRITE_EXTERNAL_STORAGE,
    CAMERA,
    READ_MEDIA_IMAGES,
    READ_EXTERNAL_STORAGE
} = PermissionsAndroid.PERMISSIONS;

const permissionsBelowAndroid10 = [WRITE_EXTERNAL_STORAGE, CAMERA];
const permissionsBelowAndroid13 = [READ_EXTERNAL_STORAGE, CAMERA];
const permissionsAboveAndroid13 = [READ_MEDIA_IMAGES, CAMERA];

export const requestImageReadWritePermission = async () => {
    if (Platform.OS !== 'android') return;

    let result: Record<string, PermissionStatus> = {};

    if (Platform.Version <= 28) {
        result = await PermissionsAndroid.requestMultiple(permissionsBelowAndroid10);
    }

    if (Platform.Version >= 33)
        result = await PermissionsAndroid.requestMultiple(permissionsAboveAndroid13);
    else
        result = await PermissionsAndroid.requestMultiple(permissionsBelowAndroid13);

    let valid = true;
    let never_ask = false;

    for (const key in result) {
        if (result[key] === 'never_ask_again') {
            valid = false;
            never_ask = true;
            break;
        }
        if (result[key] === 'denied') {
            valid = false;
            break;
        }
    }

    return { valid, never_ask };
}