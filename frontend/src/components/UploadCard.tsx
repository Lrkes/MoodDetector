import { useState } from 'react'
import uploadFile from "../services/fileUploadService.ts";
import {Button} from "@mui/material";

type PredictionResult = {
  emotion: string;
};
const UploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
      console.log("File selected:", files ? files[0].name : "No file selected")
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("No file selected");
            return;
        }
        try {
            const data = await uploadFile(selectedFile);
            setResult(data);
        } catch (err) {
            setError("Error uploading file: " + (err instanceof Error ? err.message : "Unknown error"));
        }

    };

    return (
    <div>
        <h1>Upload File</h1>
        <Button component="label" variant="contained">
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{ marginLeft: 8 }}
        >
        Upload File
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {result && <div>Prediction: {result.emotion}</div>}
    </div>
    );
};

export default UploadCard;