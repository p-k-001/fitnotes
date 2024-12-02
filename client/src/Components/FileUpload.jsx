import { useState } from 'react';
import axios from 'axios';
import InputFileUpload from './Framework/InputFileUpload';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { baseApiUrl, endpoints } from '../config';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [messageFileUploaded, setMessageFileUploaded] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // console.log(e.target.files[0].name);
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${baseApiUrl}${endpoints.workouts.upload}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setMessageFileUploaded(res.data.message);
      navigate('/workouts');
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessageFileUploaded('Failed to upload file');
    }
  };

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <InputFileUpload onChange={handleFileChange} />
      <p>{fileName}</p>
      <Button variant="contained" onClick={handleFileUpload}>
        Upload
      </Button>
      {/* <button onClick={handleFileUpload}>Upload CSV</button> */}
      <p>{messageFileUploaded}</p>
    </div>
  );
};

export default FileUpload;
