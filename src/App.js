// import logo from './logo.svg';
// import './App.css';
// import SnakeGame from './SnakeGame'; // Предполагая, что SnakeGame.js находится в той же директории

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function MyButton() {
//   return (
//     <button>
//       Change Button
//     </button>
//   );
// }

// export default function MyApp() {
//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       <MyButton />
//       <SnakeGame /> {/* Добавляем игру "Snake" в наше приложение */}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import './App.css'; // Ваши стили

const topics = [
    "Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous", "Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous", "Future Simple (will)", "Future with 'going to'", "Future Continuous", "Future Perfect", "Modal Verbs", "Passive Voice", "Conditionals (0, 1, 2, 3, Mixed)", "Reported Speech", "Questions and Negatives", "Relative Clauses", "Gerunds and Infinitives", "Nouns & Articles", "Adjectives & Adverbs", "Prepositions", "Conjunctions", "Phrasal Verbs", "Irregular Verbs", "Determiners & Quantifiers", "Pronouns", "Causatives", "Tag Questions", "Direct & Indirect Objects", "Cleft Sentences", "Inversion", "Wish & Regret", "Linking Words", "Ellipsis & Substitution", "Nominalisation", "Subject-Verb Agreement", "Review & Practice"
];

const topicDescriptions = {
    "Present Simple": "Выражает обычные действия или факты. Пример: 'She reads books.'",
    "Present Continuous": "Описывает действие, происходящее прямо сейчас. Пример: 'She is reading a book.'",
    // ... добавьте все описания, как в вашем изначальном коде
};

function Day({ topic, date, onClick, completed }) {
    return (
        <div className={`day ${completed ? 'completed' : ''}`} data-topic={topic} onClick={onClick}>
            <span className="date">{date}</span>
        </div>
    );
}

function DescriptionPanel({ topic }) {
    return (
        <div className="description" id="descriptionPanel">
            <div className="description-content">
                <h2>Describe of topic</h2>
                <p id="descriptionText">{topicDescriptions[topic] || "No description available"}</p>
            </div>
        </div>
    );
}

function App() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [completedDays, setCompletedDays] = useState({});

    useEffect(() => {
        const storedCompletedDays = JSON.parse(localStorage.getItem('completedDays') || '{}');
        setCompletedDays(storedCompletedDays);
    }, []);

    const handleDayClick = (topic, date) => {
        setSelectedTopic(topic);
        if (completedDays[date]) {
            const newCompletedDays = { ...completedDays };
            delete newCompletedDays[date];
            setCompletedDays(newCompletedDays);
            localStorage.setItem('completedDays', JSON.stringify(newCompletedDays));
        } else {
            const newCompletedDays = { ...completedDays, [date]: true };
            setCompletedDays(newCompletedDays);
            localStorage.setItem('completedDays', JSON.stringify(newCompletedDays));
        }
    };

    return (
        <div className="App">
            <div className="calendar">
                {topics.map((topic, index) => {
                    const date = new Date(2023, 7, 27 + index).toLocaleDateString('en-GB');
                    return (
                        <Day 
                            key={topic} 
                            topic={topic} 
                            date={date} 
                            onClick={() => handleDayClick(topic, date)}
                            completed={completedDays[date]}
                        />
                    );
                })}
            </div>
            {selectedTopic && <DescriptionPanel topic={selectedTopic} />}
        </div>
    );
}

export default App;
