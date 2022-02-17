import './App.css';
import Board from './components/board';

function App() {
  return (
    <div className="grid grid-rows-3 grid-cols-1 bg-red-100 h-screen w-screen overflow-auto">
      <div className="row-span-1">
        <h1>Placeholder</h1>
      </div>
      <Board />
    </div>
  );
}

export default App;
