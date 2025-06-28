import { Button } from "@mui/material";
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
const UploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
      console.log("File selected:", files ? files[0].name : "No file selected")
    };

    return (
    <div>
        <h1>Upload File</h1>
      <Button component="label" variant="contained">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </div>
    );
};

const App = () => {
  return (
    <>
      <UploadCard />
    </>
  );
};

export default App;
