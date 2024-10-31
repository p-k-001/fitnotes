import { useState } from 'react';
import axios from 'axios';

//TODO: move to config:
const baseUrl = 'http://localhost:3000';
const route = '/workouts';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${baseUrl}${route}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessage('Failed to upload file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
