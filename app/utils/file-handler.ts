import { Platform } from "react-native"
import * as rnfs from "@dr.pogodin/react-native-fs"
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const androidLocalImageDir = `${rnfs.ExternalDirectoryPath}/Pictures`;

export const saveImagesToLocalDir = async (uri: string) => {
    let filePath = '';
    let uniqueFileName = `Pic_Editor_${Date.now()}.png`;

    try {

        if (Platform.OS === "ios") {
            const { DocumentDirectoryPath } = rnfs;
            const isDirExists = await rnfs.exists(DocumentDirectoryPath);

            !isDirExists ? await rnfs.mkdir(DocumentDirectoryPath) : null;

            filePath = `${DocumentDirectoryPath}/${uniqueFileName}`;

        }

        if (Platform.OS === "android") {
            const isDirExists = await rnfs.exists(androidLocalImageDir);

            !isDirExists ? await rnfs.mkdir(androidLocalImageDir) : null;

            filePath = `${androidLocalImageDir}/${uniqueFileName}`;
        }

        return rnfs.copyFile(uri, filePath);

    } catch (error) {
        console.log(error)
    }
}

export type LocalImage = {
    name: string;
    path: string;
    size: number;
};

export const getLocalImages = async (): Promise<LocalImage[]> => {
    const dirPath = Platform.OS === "ios"
        ? rnfs.DocumentDirectoryPath
        : androidLocalImageDir;

    const isDirExists = await rnfs.exists(dirPath);
    if (!isDirExists) return [];

    const res = await rnfs.readDir(dirPath);
    return res.map(({ name, path, size }) => {
        return {
            name,
            path: path.startsWith("file://") ? path : `file://${path}`,
            size
        }
    })
}

export const removeFile = async (path: string) => {
    try {
        await rnfs.unlink(path)
    } catch (error) {
        console.log("Error removing file: ", error)
    }
}

// const saveBase64ImageToIos = async (base64data: string) => {
//     const uniqueFileName = `Pic Editor-${Date.now()}.jpg`
//     let filePath = `${rnfs.CachesDirectoryPath}/${uniqueFileName}`;

//     await rnfs.writeFile(filePath, base64data, 'base64');

//     if (!await rnfs.exists(filePath)) return console.log("file doesn't exists")

//     if (!filePath.startsWith('file:'))
//         filePath = `file://${filePath}`

//     await CameraRoll.saveAsset(filePath,{type:'photo'});
//     await rnfs.unlink(filePath);
//     // para usuarios ios é necessário instalar @react-native-camera-roll/camera-roll
// }

const saveBase64ImageToAndroid = async (base64data: string) => {
    const uniqueFileName = `Pic Editor-${Date.now()}.jpg`
    let filePath = `${rnfs.CachesDirectoryPath}/${uniqueFileName}`;

    if (!filePath.startsWith('file:')) {
        filePath = `file://${filePath}`
    }

    await rnfs.writeFile(filePath, base64data, 'base64');
    await CameraRoll.saveAsset(filePath, { type: 'photo' });
    await rnfs.unlink(filePath);
}

export const saveBase64ImageToDevice = (content: string) => {
    const base64Data = content.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');

    if (Platform.OS === "android")
        saveBase64ImageToAndroid(base64Data);

    // if (Platform.OS === "ios")
    //     saveBase64ImageToIos(base64Data);
}