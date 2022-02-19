import './App.css';
import JobsProvider from './context/JobsProvider';
import Board from './components/board';
import Filter from './components/filter';

function App() {
  return (
    <JobsProvider>
      <div className="grid grid-rows-3 grid-cols-1 h-screen w-screen overflow-auto">
        <Filter />
        <Board />
      </div>
    </JobsProvider>
  );
}

export default App;
