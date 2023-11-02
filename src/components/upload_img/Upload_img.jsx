import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const App = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store the uploaded image URL
    const [uploading, setUploading] = useState(false);

    const uploadImage = async () => {
        if (imageUpload == null || uploading) return;

        const imageRef = ref(storage, `images/${imageUpload.name}-${v4()}`); // link trong folder trong firebase 
        setUploading(true);

        uploadBytes(imageRef, imageUpload)
            .then(() => {
                alert("Image Uploaded");
                setUploading(false);
                getDownloadURL(imageRef).then((url) => {
                    setUploadedImageUrl(url); // Store the uploaded image URL
                });
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                setUploading(false);
            });
    };

    const hanldeUpload = (e) => {
        setImageUpload(e.target.files[0])
    }

    return (
        <div>
            <input type="file" onChange={hanldeUpload} />
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {uploadedImageUrl && (
                <div>
                    <img src={uploadedImageUrl} alt="ahihi" style={{width: '500px', height: '500px'}} />
                    <h3>Uploaded Image URL:</h3>
                    <p>{uploadedImageUrl}</p>
                </div>
            )}
        </div>
    );
};
