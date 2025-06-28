import axios from 'axios';

const API_URL = "http://localhost:8000/predict";
const uploadFile = async (file: File)=> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(API_URL, formData);
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }

};

export default uploadFile;