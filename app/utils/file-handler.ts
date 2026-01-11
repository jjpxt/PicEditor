import { Platform } from "react-native"
import * as rnfs from "@dr.pogodin/react-native-fs"

const androidLocalImageDir = `${rnfs.ExternalDirectoryPath}/Pictures`;

export const saveImagesToLocalDir = async (uri: string) => {
    let filePath = '';
    let uniqueFileName = `Pic_Editor_${Date.now()}.png`;

    try {

        if (Platform.OS === "ios") {
            const { DocumentDirectoryPath } = rnfs;
            const isDirExists = await rnfs.exists(DocumentDirectoryPath);

            !isDirExists ? await rnfs.mkdir(DocumentDirectoryPath) : null;

            filePath = `${DocumentDirectoryPath}/${uniqueFileName};`

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