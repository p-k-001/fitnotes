import WorkoutList from '../Components/WorkoutList';
import DbDelete from '../Components/DbDelete';

const WorkoutPage = () => {
  return (
    <div>
      <h1>Gym Workout Tracker</h1>
      <WorkoutList />
      <DbDelete />
    </div>
  );
};

export default WorkoutPage;
