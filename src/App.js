import logo from './logo.svg';
import './App.css';
import SnakeGame from './SnakeGame'; // Предполагая, что SnakeGame.js находится в той же директории

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function MyButton() {
  return (
    <button>
      Change Button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <SnakeGame /> {/* Добавляем игру "Snake" в наше приложение */}
    </div>
  );
}
