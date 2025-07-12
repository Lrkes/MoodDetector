import { useState } from 'react'
import uploadFile from "../services/fileUploadService.ts";
import { Button, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import * as React from "react";

type PredictionResult = {
  emotion: string;
};

const UploadCard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setSelectedPreview(URL.createObjectURL(files[0]));
    }
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }
    setUploading(true);
    setResult(null);
    setError(null);
    try {
      const data = await uploadFile(selectedFile);
      setResult(data);
    } catch (err) {
      setError("Error uploading file: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setUploading(false);
  };

  return (
    <div>
      <Typography variant="h2" component="h1" align="center">
        Emotion Detector
      </Typography>
      <Typography variant="h5" align="center" mb={3}>
        Upload a selfie to see your predicted emotion.
      </Typography>

      {/* Main content: vertical flex, centers everything */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>

        {/* Top row: image + result */}
        <Box display="flex" alignItems="flex-start" justifyContent="center" gap={6}>
          {/* Left: Image or placeholder */}
          <Box>
            {(selectedPreview ? (
              <CardMedia
                component="img"
                height="340"
                image={selectedPreview}
                style={{
                  marginTop: 32,
                  marginBottom: 32,
                  borderRadius: 16,
                  width: 440,
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(60,60,100,0.10)'
                }}
              />
            ) : (
              <Box
                style={{
                  marginTop: 32,
                  width: 220,
                  height: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #ccc',
                  borderRadius: 16,
                  color: '#aaa',
                  background: '#fafbfc',
                  fontSize: 18,
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(60,60,100,0.03)'
                }}
              >
                <ImageOutlinedIcon fontSize="large" style={{ marginBottom: 8, color: '#bbb' }} />
                No image selected
              </Box>
            )) as React.ReactNode}
          </Box>

          {/* Right: Controls and output */}
          <Box minWidth={320} display="flex" flexDirection="column" alignItems="center">
            {/* Spinner */}
            {(uploading ? (
              <Box width={80} height={80} display="flex" alignItems="center" justifyContent="center" mb={2}>
                <CircularProgress thickness={4} size={80} />
              </Box>
            ) : null) as React.ReactNode}

            {/* Error */}
            {(!uploading && error ? (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            ) : null) as React.ReactNode}

            {/* Prediction Result */}
            {(!uploading && result ? (
              <Box
                style={{
                  opacity: result ? 1 : 0,
                  transition: "opacity 0.7s cubic-bezier(.86,.09,.1,1.22)",
                  background: "linear-gradient(90deg, #f7b42c, #fc575e, #43cea2)",
                  backgroundSize: "200% 200%",
                  animation: "gradientMove 3.5s ease-in-out infinite",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "2.3rem",
                  letterSpacing: "0.03em",
                  borderRadius: 16,
                  padding: "28px 54px",
                  margin: "36px auto",
                  boxShadow: "0 4px 16px rgba(252,87,94,0.10)",
                  textAlign: "center",
                  minWidth: 220,
                  maxWidth: 360,
                }}
              >
                {result.emotion.charAt(0).toUpperCase() + result.emotion.slice(1)}
              </Box>
            ) : null) as React.ReactNode}
          </Box>
        </Box>

        {/* Button Row, centered below */}
        <Box display="flex" gap={2} mt={4} mb={3}>
          <Button component="label" variant="contained" size="large">
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            Upload File
          </Button>
        </Box>
      </Box>
      {/* Gradient animation for result box */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default UploadCard;
