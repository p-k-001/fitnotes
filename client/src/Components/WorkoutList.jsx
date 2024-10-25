import { useEffect, useState } from 'react';
import axios from 'axios';

//TODO: move to config:
const baseUrl = 'http://localhost:3000';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/workouts`);
        setWorkouts(res.data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    };

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
            <td>{workout.reps}</td>
            {/* Add other data fields */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutList;
