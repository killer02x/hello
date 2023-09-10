import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const boardSize = 30;

function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 15, y: 15 }]);
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    });

    const snakeRef = useRef(snake);
    const directionRef = useRef({ x: 0, y: 0 });
    const newDirectionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y === 0) newDirectionRef.current = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                    if (directionRef.current.y === 0) newDirectionRef.current = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                    if (directionRef.current.x === 0) newDirectionRef.current = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                    if (directionRef.current.x === 0) newDirectionRef.current = { x: 1, y: 0 };
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const gameLoop = () => {
            directionRef.current = newDirectionRef.current;
            const head = snakeRef.current[0];
            const newHead = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };

            let newSnake = [...snakeRef.current];
            if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize || snakeRef.current.some(part => part.x === newHead.x && part.y === newHead.y)) {
                newSnake = [{ x: 15, y: 15 }];
                directionRef.current = { x: 0, y: 0 };
                newDirectionRef.current = { x: 0, y: 0 };
            } else {
                newSnake = [newHead, ...newSnake];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood({
                        x: Math.floor(Math.random() * boardSize),
                        y: Math.floor(Math.random() * boardSize)
                    });
                } else {
                    newSnake.pop();
                }
            }

            setSnake(newSnake);
            setTimeout(gameLoop, 100);
        };

        gameLoop();
    }, [food]);

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
