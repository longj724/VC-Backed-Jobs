import './App.css';
import Board from './components/board';
import Filter from './components/filter';

function App() {
  return (
    <div className="grid grid-rows-3 grid-cols-1 h-screen w-screen overflow-auto">
      <Filter />
      <Board />
    </div>
  );
}

export default App;
