import { useState } from 'react';
import axios from 'axios';

//TODO: move to config:
const baseUrl = 'http://localhost:3000';
const route = '/workouts';

const DbDelete = () => {
  const [message, setMessage] = useState('');

  const deleteDatabase = async () => {
    try {
      const res = await axios.delete(`${baseUrl}${route}/deletedb`);
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
