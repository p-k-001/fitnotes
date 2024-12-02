import { useEffect, useState } from 'react';
import axios from 'axios';

import { baseApiUrl, endpoints } from '../config';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(`${baseApiUrl}${endpoints.workouts.getAll}`);
      setWorkouts(res.data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Exercise</th>
          <th>Category</th>
          <th>Weight</th>
          <th>Weight Unit</th>
          <th>Reps</th>
          {/* Add other columns as necessary */}
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout) => (
          <tr key={workout.id}>
            <td>{workout.date}</td>
            <td>{workout.exercise}</td>
            <td>{workout.category}</td>
            <td>{workout.weight}</td>
            <td>{workout.weight_unit}</td>
            <td>{workout.reps}</td>
            {/* Add other data fields */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutList;
