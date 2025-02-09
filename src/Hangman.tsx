import { useState, useEffect, useCallback } from "react";

const words = ["react", "typescript", "node", "javascript", "frontend"];
const maxErrors = 10;

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default function Hangman() {
  const [word, setWord] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const maskedWord = word.split("" ).map(letter => (guessedLetters.includes(letter) ? letter : "_"));

  useEffect(() => {
    if (maskedWord.join("" ) === word) setWin(true);
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
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-pink-200 to-blue-200 min-h-screen justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-center border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Hangman Game</h1>
        <p className="text-3xl tracking-widest text-gray-700 font-mono bg-gray-100 p-2 rounded-lg">{maskedWord.join(" " )}</p>
        <p className="text-lg text-gray-600 mt-4">Errors: <span className="font-semibold text-red-500">{errors}</span> / {maxErrors}</p>
        {gameOver && <p className="text-red-600 font-bold mt-4 text-xl">Oh no, you lose 😢 <br/> The word was "{word}"</p>}
        {win && <p className="text-green-600 font-bold mt-4 text-xl">Wow, congratulations! 🎉 You won!</p>}
        {(gameOver || win) && <button onClick={resetGame} className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">Play again</button>}
      </div>
    </div>
  );
}
