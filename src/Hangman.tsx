import { useState, useEffect, useCallback } from "react";
import './Hangman.css';

const words = ["react", "typescript", "node", "javascript", "frontend"];
const maxErrors = 10;

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default function Hangman() {
  const [word, setWord] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const maskedWord = word.split("").map(letter => (guessedLetters.includes(letter) ? letter : "_"));

  useEffect(() => {
    if (maskedWord.join("") === word) setWin(true);
    if (errors >= maxErrors) setGameOver(true);
  }, [guessedLetters, errors, word, maskedWord]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameOver || win) return;
    const letter = event.key.toLowerCase();
    if (!/^[a-z]$/.test(letter) || guessedLetters.includes(letter)) return;
    
    setGuessedLetters(prev => [...prev, letter]);
    if (!word.includes(letter)) setErrors(prev => prev + 1);
  }, [guessedLetters, gameOver, win, word]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setErrors(0);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white justify-center">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-96 text-center border border-gray-600">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6">Hangman Game</h1>
        <p className="text-3xl tracking-widest font-mono bg-gray-700 p-3 rounded-lg shadow-md inline-block text-gray-200">
          {maskedWord.join(" ")}
        </p>
        <p className="text-lg text-gray-400 mt-4">Errors: 
          <span className="font-semibold text-red-500"> {errors}</span> / {maxErrors}
        </p>
        {gameOver && <p className="text-red-500 font-bold mt-4 text-xl">Oh no, you lost! 😢 <br/> The word was "{word}"</p>}
        {win && <p className="text-green-400 font-bold mt-4 text-xl">Congratulations! 🎉 You won!</p>}
        {(gameOver || win) && (
          <button 
            onClick={resetGame} 
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-purple-600"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
