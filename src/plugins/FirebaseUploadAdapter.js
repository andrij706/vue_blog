import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

export default class FirebaseUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload = async () => {
        try {
            const file = await this.loader.file;
            const storage = getStorage();
            const storageRef = ref(storage, `uploads/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);

            const downloadURL = await getDownloadURL(snapshot.ref);

            return { default: downloadURL };
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
}

export function createFirebaseUploadAdapter(loader) {
    return new FirebaseUploadAdapter(loader);
}
