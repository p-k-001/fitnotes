import { useState } from 'react';
import axios from 'axios';
import { baseApiUrl, endpoints } from '../config';

const DbDelete = () => {
  const [message, setMessage] = useState('');

  const deleteDatabase = async () => {
    try {
      const res = await axios.delete(
        `${baseApiUrl}${endpoints.workouts.deleteAll}`
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error('Error deleting db:', err);
      setMessage('Failed to delete db');
    }
  };
  return (
    <>
      <button onClick={deleteDatabase}>DeleteDb</button>
      <p>{message}</p>
    </>
  );
};
export default DbDelete;
