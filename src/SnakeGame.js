import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const boardSize = 30;

function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 15, y: 15 }]);
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [newDirection, setNewDirection] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setNewDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setNewDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setNewDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setNewDirection({ x: 1, y: 0 });
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]);

    useEffect(() => {
        const gameLoop = () => {
            setDirection(newDirection);
            const head = snake[0];
            const newHead = { x: head.x + direction.x, y: head.y + direction.y };
    
            if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize || snake.some(part => part.x === newHead.x && part.y === newHead.y)) {
                setSnake([{ x: 15, y: 15 }]);
                setDirection({ x: 0, y: 0 });
                setNewDirection({ x: 0, y: 0 });
            } else {
                const newSnake = [newHead, ...snake];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood({
                        x: Math.floor(Math.random() * boardSize),
                        y: Math.floor(Math.random() * boardSize)
                    });
                } else {
                    newSnake.pop();
                }
                setSnake(newSnake);
            }
    
            setTimeout(gameLoop, 100);
        };
    
        gameLoop();
    
        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(gameLoop);
    }, []);
    

    return (
        <div id="game-board">
            {snake.map((part, index) => (
                <div key={index} className="snake-part" style={{ left: `${part.x * 10}px`, top: `${part.y * 10}px` }}></div>
            ))}
            <div className="food" style={{ left: `${food.x * 10}px`, top: `${food.y * 10}px` }}></div>
        </div>
    );
}

export default SnakeGame;
