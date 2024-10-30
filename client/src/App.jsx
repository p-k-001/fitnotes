import FileUpload from './Components/FileUpload';
import WorkoutList from './Components/WorkoutList';
import './App.css';
import DbDelete from './Components/DbDelete';

const App = () => {
  return (
    <>
      <div>
        <h1>Gym Workout Tracker</h1>
        <FileUpload />
        <WorkoutList />
        <DbDelete />
      </div>
    </>
  );
};

export default App;
