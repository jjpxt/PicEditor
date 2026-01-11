import { Platform } from "react-native"
import * as rnfs from "@dr.pogodin/react-native-fs"


export const saveImagesToLocalDir = async (uri: string) => {
    let filePath = '';
    let uniqueFileName = `Pic_Editor_${Date.now()}.png`;
    const androidLocalImageDir = `${rnfs.ExternalDirectoryPath}/Pictures`;

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
